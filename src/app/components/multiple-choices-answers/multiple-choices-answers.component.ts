import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Choices } from 'src/app/services/multi-choice-answers.service';
import { Question } from 'src/app/models/question.model';

import { QuestionComponent } from '../question/question.component';
import { AnswerFeedbackComponent } from '../answer-feedback/answer-feedback.component';
import { MatButton } from '@angular/material/button';

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

  answerQuestion(answer: string): void {
    const parsed = parseInt(answer, 10);
    if (!isNaN(parsed)) {
      this.answeredQuestion.emit(parsed);
    }
  }
}
