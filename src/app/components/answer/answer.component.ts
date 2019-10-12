import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerComponent implements OnInit, OnChanges {

  @Input() question: Question;

  hasAnswers = false;
  isCorrect = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question) {
      this.hasAnswers = this.question.answers.length > 0;
      if (this.hasAnswers) {
        this.isCorrect = this.question.answers[
          this.question.answers.length - 1
        ].correct;
      }
    }
  }
}
