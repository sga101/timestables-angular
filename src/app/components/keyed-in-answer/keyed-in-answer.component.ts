import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { AutoFocusDirective } from '../../focus.directive';
import { MatButton } from '@angular/material/button';
import { AnswerFeedbackComponent } from '../answer-feedback/answer-feedback.component';

@Component({
    selector: 'app-keyed-in-answer',
    templateUrl: './keyed-in-answer.component.html',
    styleUrls: ['./keyed-in-answer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, FormsModule, QuestionComponent, AutoFocusDirective, MatButton, AnswerFeedbackComponent]
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
