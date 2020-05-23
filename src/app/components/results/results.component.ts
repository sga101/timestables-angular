import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Results } from 'src/app/models/results.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent {
  @Input() results: Results;

  @Output() startAgainClicked = new EventEmitter<void>();
  startAgain(): void {
    this.startAgainClicked.emit();
  }
}
