import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { timer, Observable, BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnDestroy, OnChanges {
  totalTimeSubject: BehaviorSubject<string>;
  questionTimeSubject: BehaviorSubject<string>;

  totalTime$: Observable<string>;
  questionTime$: Observable<string>;

  constructor() {
    this.totalTimeSubject = new BehaviorSubject('');
    this.totalTime$ = this.totalTimeSubject.asObservable();

    this.questionTimeSubject = new BehaviorSubject('');
    this.questionTime$ = this.questionTimeSubject.asObservable();
  }

  @Input() initialStartTime: number;
  @Input() startTime: number;

  @Input() completed = false;

  timeElapsed = '0';

  totalTime = '0';
  timer$: Observable<number>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.completed) {
      if (this.completed === false) {
        this.startTimer();
      }
    }
  }

  startTimer(): void {
    this.timeElapsed = '0';
    this.timer$ = timer(1000, 1000);
    this.timer$.pipe(takeWhile(() => !this.completed)).subscribe(() => {
      this.timeElapsed = Math.floor((Date.now() - this.startTime) / 1000).toString();
      this.totalTime = Math.floor((Date.now() - this.initialStartTime) / 1000).toString();
      this.questionTimeSubject.next(this.timeElapsed);
      this.totalTimeSubject.next(this.totalTime);
    });
  }

  ngOnDestroy(): void {
    this.completed = true;
  }
}
