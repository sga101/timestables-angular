import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

import { AutoFocusDirective } from '../../focus.directive';
import { Question } from '../../models/question.model';
import { AnswerFeedbackComponent } from '../answer-feedback/answer-feedback.component';
import { QuestionComponent } from '../question/question.component';

@Component({
    selector: 'app-keyed-in-answer',
    templateUrl: './keyed-in-answer.component.html',
    styleUrls: ['./keyed-in-answer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, QuestionComponent, AutoFocusDirective, MatButton, AnswerFeedbackComponent]
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
