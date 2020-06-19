import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Question } from '../models/question.model';
import { ResultsService } from './results.service';
import { TimerService } from './timer.service';
import { RandomNumbersService } from './random-numbers.service';
import { TableSelectionService } from './table-selection.service';
import { TableSelection } from '../models/table-selection.model';
import { tap } from 'rxjs/operators';

const defaultQuestions = 20;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  selectedTables: TableSelection[];

  constructor(
    private timerService: TimerService,
    private resultsService: ResultsService,
    private randomNumbersService: RandomNumbersService,
    private tableSelectionService: TableSelectionService
  ) {
    this.tableSelectionService.selected$.pipe(tap((selected) => (this.selectedTables = selected))).subscribe();
    this.currentQuestion = this.generateQuestion();
    this.questionSubject = new BehaviorSubject<Question>(this.currentQuestion);
    this.questionHistorySubject = new BehaviorSubject<Question[]>(this.questionHistory);
    this.questions$ = this.questionSubject.asObservable();
    this.questionHistory$ = this.questionHistorySubject.asObservable();
    this.remainingSubject = new BehaviorSubject(defaultQuestions);
    this.remaining$ = this.remainingSubject.asObservable();
    this.reset(defaultQuestions);
  }

  private questionSubject: BehaviorSubject<Question>;
  private currentQuestion: Question;
  private questionHistory: Question[] = [];
  private questionHistorySubject: BehaviorSubject<Question[]>;
  private totalQuestions: number;
  private remainingSubject: BehaviorSubject<number>;

  questions$: Observable<Question>;

  questionHistory$: Observable<Question[]>;

  remaining$: Observable<number>;

  reset(questionsToAsk: number = defaultQuestions): void {
    this.totalQuestions = questionsToAsk;
    this.questionHistory = [];
    this.nextQuestion();
    this.resultsService.reset();
    this.timerService.reset();
  }

  nextQuestion(previousQuestion: Question = null): void {
    if (previousQuestion) {
      this.questionHistory = this.questionHistory.concat(previousQuestion);
      this.questionHistorySubject.next(this.questionHistory);
    }
    this.currentQuestion = this.generateQuestion();
    this.questionSubject.next(this.currentQuestion);
    this.remainingSubject.next(this.totalQuestions - this.questionHistory.length);
    this.timerService.startTimer();
  }

  answerQuestion(answer: number): void {
    const correctAnswer = this.currentQuestion.x * this.currentQuestion.y;
    const correct = answer === correctAnswer;
    const timeTaken = Date.now() - this.currentQuestion.startTime;
    const answeredQuestion: Question = {
      ...this.currentQuestion,
      answers: this.currentQuestion.answers.concat({
        answer,
        correct,
        timeTaken
      }),
      answered: true,
      answeredCorrectly: correct,
      endTime: Date.now()
    };

    this.currentQuestion = answeredQuestion;

    this.questionSubject.next(this.currentQuestion);

    if (correct) {
      const finished = this.questionHistory.length + 1 >= this.totalQuestions;
      finished ? this.endGame() : this.provideNextQuestion();
    }
  }

  private provideNextQuestion() {
    timer(500).subscribe(() => this.nextQuestion(this.currentQuestion));
  }

  private endGame() {
    this.timerService.stopTimer();
    this.questionHistory = this.questionHistory.concat(this.currentQuestion);
    this.questionHistorySubject.next(this.questionHistory);
    this.currentQuestion = null;
    this.questionSubject.next(this.currentQuestion);
    this.resultsService.buildResults(this.questionHistory);
  }

  generateQuestion(): Question {
    const validTables = this.selectedTables.filter((t) => t.selected);
    const index = this.randomNumbersService.getRandomNumber(0, validTables.length - 1);
    const y = validTables[index].table;

    // Ensure the next question is different
    const currentX = (this.currentQuestion && this.currentQuestion.x) || 0;
    let x = currentX;
    while (x === currentX) {
      x = this.randomNumbersService.getRandomNumber(1, 12);
    }

    return { x, y, startTime: Date.now(), answers: [], endTime: 0, answered: false, answeredCorrectly: false };
  }
}
