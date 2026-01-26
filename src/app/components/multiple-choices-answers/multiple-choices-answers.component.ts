import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { Question } from '../../models/question.model';
import { Choices } from '../../services/multi-choice-answers.service';

import { AnswerFeedbackComponent } from '../answer-feedback/answer-feedback.component';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-multiple-choices-answers',
  templateUrl: './multiple-choices-answers.component.html',
  styleUrls: ['./multiple-choices-answers.component.css'],
  imports: [QuestionComponent, AnswerFeedbackComponent, MatButton]
})
export class MultipleChoicesAnswersComponent {
  @Input() choices: Choices;
  @Input() question: Question;
  @Output() answeredQuestion = new EventEmitter<number>();

  answerQuestion(answer: number): void {
    //const parsed = parseInt(answer, 10);
    //if (!isNaN(parsed)) {
    this.answeredQuestion.emit(answer);
    //}
  }
}
