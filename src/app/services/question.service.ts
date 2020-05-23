import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() {
    this.currentQuestion = this.generateQuestion();
    this.questionSubject = new BehaviorSubject<Question>(this.currentQuestion);
    this.questionHistorySubject = new BehaviorSubject<Question[]>(this.questionHistory);
    this.questions$ = this.questionSubject.asObservable();
    this.questionHistory$ = this.questionHistorySubject.asObservable();
    this.initialStartTime = Date.now();
  }

  private questionSubject: BehaviorSubject<Question>;
  private currentQuestion: Question;
  private questionHistory: Question[] = [];
  private questionHistorySubject: BehaviorSubject<Question[]>;

  public initialStartTime: number;

  questions$: Observable<Question>;

  questionHistory$: Observable<Question[]>;

  nextQuestion(): void {
    this.questionHistory = this.questionHistory.concat(this.currentQuestion);
    this.questionHistorySubject.next(this.questionHistory);
    this.currentQuestion = this.generateQuestion();
    this.questionSubject.next(this.currentQuestion);
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
      timer(500).subscribe(() => this.nextQuestion());
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
