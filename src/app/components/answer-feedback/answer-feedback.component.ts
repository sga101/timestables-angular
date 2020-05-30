import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-answer-feedback',
  templateUrl: './answer-feedback.component.html',
  styleUrls: ['./answer-feedback.component.css']
})
export class AnswerFeedbackComponent {
  @Input() question: Question;
}
