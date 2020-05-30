import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { WhenDirtyAndInvalidMatcher } from './when-dirty-and-invalid-matcher';

@Component({
  selector: 'app-keyed-in-answer',
  templateUrl: './keyed-in-answer.component.html',
  styleUrls: ['./keyed-in-answer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyedInAnswerComponent implements OnChanges {
  @Input() question: Question;
  @Output() answeredQuestion = new EventEmitter<number>();

  answerForm: FormGroup;

  errorMatcher = new WhenDirtyAndInvalidMatcher();

  answered = false;
  answeredCorrectly = false;
  answerGiven = '';

  answer = new FormControl('', [Validators.required, Validators.min(1), Validators.max(144)]);

  constructor(private readonly formBuilder: FormBuilder) {
    this.answerForm = this.formBuilder.group({ answer: this.answer });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question && this.question) {
      this.answered = this.question.answers.length > 0;
      if (!this.answered) {
        this.answer.setValue('');
      }
      this.answeredCorrectly = this.question.answers.filter((a) => a.correct).length > 0;
    }
  }

  answerQuestion(answer: string): void {
    const parsed = parseInt(answer, 10);
    if (!isNaN(parsed)) {
      this.answeredQuestion.emit(parsed);
    }
  }
}
