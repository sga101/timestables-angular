import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() {
    this.questionSubject = new BehaviorSubject<Question>(
      this.generateQuestion()
    );
    this.questions$ = this.questionSubject.asObservable();
  }

  private questionSubject: BehaviorSubject<Question>;
  private currentQuestion: Question;
  private questionHistory: Question[] = [];
  private questionHistorySubject: BehaviorSubject<Question[]>;


  questions$: Observable<Question>;

  questionHistory$: Observable<Question[]>;

  nextQuestion() {
    this.questionHistory = this.questionHistory.concat(this.currentQuestion);
    this.questionHistorySubject.next(this.questionHistory);
    this.currentQuestion = this.generateQuestion();
    this.questionSubject.next(this.currentQuestion);
  }

  answerQuestion(answer: number) {
    const correctAnswer = this.currentQuestion.x * this.currentQuestion.y;
    const correct = answer === correctAnswer;
    const timeTaken = Date.now() - this.currentQuestion.startTime;
    const answeredQuestion: Question = {
      ...this.currentQuestion,
      answers: this.currentQuestion.answers.concat({
        answer,
        correct,
        timeTaken
      })
    };

    this.questionSubject.next(answeredQuestion);

    if (correct) {
      timer(1000).subscribe(() => this.nextQuestion());
    }
  }

  generateQuestion(): Question {
    const x = this.getRandomNumber(1, 12);
    const y = this.getRandomNumber(1, 12);
    return { x, y, startTime: Date.now(), answers: [] };
  }

  getRandomNumber(min: number, max: number): number {
    const range = max - min;
    return min + Math.floor(Math.random() * (range + 1));
  }
}
