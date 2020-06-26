import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-keyed-in-answer',
  templateUrl: './keyed-in-answer.component.html',
  styleUrls: ['./keyed-in-answer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyedInAnswerComponent {
  @Input() question: Question;
  @Input() answerText = '';
  @Output() answeredQuestion = new EventEmitter<number>();

  answerQuestion(): void {
    const parsed = parseInt(this.answerText, 10);
    if (!isNaN(parsed)) {
      this.answeredQuestion.emit(parsed);
    }
  }
}
