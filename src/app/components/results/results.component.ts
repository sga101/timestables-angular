import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Results } from 'src/app/models/results.model';
import { NgIf, DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AutoFocusDirective } from '../../focus.directive';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, MatButton, AutoFocusDirective, DecimalPipe]
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
