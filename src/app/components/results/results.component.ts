import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Results } from '../../models/results.model';
import { DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AutoFocusDirective } from '../../focus.directive';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButton, AutoFocusDirective, DecimalPipe]
})
export class ResultsComponent {
  @Input() results: Results;

  @Output() startAgainClicked = new EventEmitter<void>();
  startAgain(): void {
    this.startAgainClicked.emit();
  }

  @Output() changeSettingsClicked = new EventEmitter<void>();
  changeSettings(): void {
    this.changeSettingsClicked.emit();
  }
}
