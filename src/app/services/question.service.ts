import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { TableSelection } from '../models/table-selection.model';
import { HistoryService } from './history.service';
import { RandomNumbersService } from './random-numbers.service';
import { ResultsService } from './results.service';
import { TableSelectionService } from './table-selection.service';
import { TimerService } from './timer.service';

const defaultQuestions = 2;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  selectedTables: TableSelection[];

  constructor(
    private timerService: TimerService,
    private resultsService: ResultsService,
    private randomNumbersService: RandomNumbersService,
    private tableSelectionService: TableSelectionService,
    private historyService: HistoryService
  ) {
    this.tableSelectionService.selected$.pipe(tap((selected) => (this.selectedTables = selected))).subscribe();
    this.currentQuestion = this.generateQuestion();
    this.questionSubject = new BehaviorSubject<Question>(this.currentQuestion);
    this.questions$ = this.questionSubject.asObservable();
    this.remainingSubject = new BehaviorSubject(defaultQuestions);
    this.remaining$ = this.remainingSubject.asObservable();
    this.reset(defaultQuestions);
  }

  private questionSubject: BehaviorSubject<Question>;
  private currentQuestion: Question;
  private totalQuestions: number;
  private remainingSubject: BehaviorSubject<number>;
  private questionsAnswered: number;

  questions$: Observable<Question>;
  remaining$: Observable<number>;

  reset(questionsToAsk: number = defaultQuestions): void {
    this.questionsAnswered = 0;
    this.totalQuestions = questionsToAsk;
    this.nextQuestion();
    this.resultsService.reset();
    this.timerService.reset();
  }

  nextQuestion(previousQuestion: Question = null): void {
    if (previousQuestion) {
      this.historyService.addQuestion(previousQuestion);
    }
    this.currentQuestion = this.generateQuestion();
    this.questionSubject.next(this.currentQuestion);
    this.remainingSubject.next(this.totalQuestions - this.questionsAnswered);
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
      this.questionsAnswered++;
      console.log(this.questionsAnswered, this.totalQuestions);
      const finished = this.questionsAnswered >= this.totalQuestions;
      finished ? this.endGame() : this.provideNextQuestion();
    }
  }

  private provideNextQuestion() {
    timer(500).subscribe(() => this.nextQuestion(this.currentQuestion));
  }

  private endGame() {
    this.timerService.stopTimer();
    this.historyService.addQuestion(this.currentQuestion);
    this.currentQuestion = null;
    this.questionSubject.next(this.currentQuestion);
    this.resultsService.publishResults();
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
