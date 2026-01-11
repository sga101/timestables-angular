import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TimerService } from '../../services/timer.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css'],
    imports: [AsyncPipe]
})
export class TimerComponent {
  totalTime$: Observable<string>;
  questionTime$: Observable<string>;

  constructor() {
    const timerService = inject(TimerService);

    this.totalTime$ = timerService.totalTime$;
    this.questionTime$ = timerService.questionTime$;
  }
}
