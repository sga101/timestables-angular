import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { timer, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private readonly cdr: ChangeDetectorRef) {}

  @Input() startTime: number;

  @Input() completed = false;

  timeElapsed = '0';

  timer$: Observable<number>;

  ngOnInit() {}

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
      this.timeElapsed = Math.floor(
        (Date.now() - this.startTime) / 1000
      ).toString();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.completed = true;
  }
}
