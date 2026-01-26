import { Component, Input } from '@angular/core';
import { Question } from '../../models/question.model';


@Component({
    selector: 'app-answer-feedback',
    templateUrl: './answer-feedback.component.html',
    styleUrls: ['./answer-feedback.component.css'],
    imports: []
})
export class AnswerFeedbackComponent {
  @Input() question: Question;
}
