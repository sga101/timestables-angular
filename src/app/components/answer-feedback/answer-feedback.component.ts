import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-answer-feedback',
    templateUrl: './answer-feedback.component.html',
    styleUrls: ['./answer-feedback.component.css'],
    imports: [NgIf]
})
export class AnswerFeedbackComponent {
  @Input() question: Question;
}
