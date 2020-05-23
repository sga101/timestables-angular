import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Question } from '../models/question.model';
import { ResultsService } from './results.service';
import { TimerService } from './timer.service';

const defaultQuestions = 20;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private timerService: TimerService, private resultsService: ResultsService) {
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
      endTime: Date.now()
    };
    this.currentQuestion = answeredQuestion;

    this.questionSubject.next(this.currentQuestion);

    if (correct) {
      if (this.questionHistory.length < this.totalQuestions) {
        timer(500).subscribe(() => this.nextQuestion(this.currentQuestion));
      } else {
        this.timerService.stopTimer();
        this.currentQuestion = null;
        this.questionSubject.next(this.currentQuestion);
        this.resultsService.buildResults(this.questionHistory);
      }
    }
  }

  generateQuestion(): Question {
    const x = this.getRandomNumber(1, 12);
    const y = this.getRandomNumber(1, 12);
    return { x, y, startTime: Date.now(), answers: [], endTime: 0 };
  }

  getRandomNumber(min: number, max: number): number {
    const range = max - min;
    return min + Math.floor(Math.random() * (range + 1));
  }
}
