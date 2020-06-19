import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor() {
    this.questionHistorySubject = new BehaviorSubject<Question[]>(this.questionHistory);
    this.questionHistory$ = this.questionHistorySubject.asObservable();
  }

  private questionHistory: Question[] = [];
  private questionHistorySubject: BehaviorSubject<Question[]>;

  questions$: Observable<Question>;

  questionHistory$: Observable<Question[]>;

  public addQuestion(question: Question): void {
    this.questionHistory = this.questionHistory.concat(question);
    this.update();
  }

  public archive(): void {
    this.questionHistory = [];
    this.update();
  }

  update(): void {
    this.questionHistorySubject.next(this.questionHistory);
  }
}
