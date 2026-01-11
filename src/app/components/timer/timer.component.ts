import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TimerService } from '../../services/timer.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css'],
    standalone: false
})
export class TimerComponent {
  totalTime$: Observable<string>;
  questionTime$: Observable<string>;

  constructor(timerService: TimerService) {
    this.totalTime$ = timerService.totalTime$;
    this.questionTime$ = timerService.questionTime$;
  }
}
