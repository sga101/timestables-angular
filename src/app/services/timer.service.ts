import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  initialStartTime: number;
  startTime: number;

  totalTimeSubject: BehaviorSubject<string>;
  questionTimeSubject: BehaviorSubject<string>;
  resetSubject: Subject<boolean>;

  totalTime$: Observable<string>;
  questionTime$: Observable<string>;
  timer$: Observable<number>;

  constructor() {
    this.totalTimeSubject = new BehaviorSubject('');
    this.totalTime$ = this.totalTimeSubject.asObservable();

    this.questionTimeSubject = new BehaviorSubject('');
    this.questionTime$ = this.questionTimeSubject.asObservable();
    this.resetSubject = new Subject();
  }

  startTimer(): void {
    if (!this.initialStartTime) {
      this.initialStartTime = Date.now();
    }
    this.startTime = Date.now();

    this.resetSubject.next(true);
    this.timer$ = timer(0, 1000);
    this.timer$.pipe(takeUntil(this.resetSubject.asObservable())).subscribe(() => {
      const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000).toString();
      const totalTime = Math.floor((Date.now() - this.initialStartTime) / 1000).toString();
      this.questionTimeSubject.next(timeElapsed);
      this.totalTimeSubject.next(totalTime);
    });
  }
}
