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
  answer = new FormControl('', [Validators.required, Validators.min(1), Validators.max(144)]);

  constructor(private readonly formBuilder: FormBuilder) {
    this.answerForm = this.formBuilder.group({ answer: this.answer });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question && this.question) {
      if (!this.question.answered) {
        this.answer.setValue('');
      }
    }
  }

  answerQuestion(answer: string): void {
    const parsed = parseInt(answer, 10);
    if (!isNaN(parsed)) {
      this.answeredQuestion.emit(parsed);
    }
  }
}
