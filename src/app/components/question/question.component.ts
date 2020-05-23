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
import { ErrorStateMatcher } from '@angular/material/core';
import { Question } from 'src/app/models/question.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class WhenDirtyAndInvalidMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnChanges {
  @Input() initialStartTime: number;
  @Input() question: Question;
  @Output() getNextQuestion = new EventEmitter<void>();
  @Output() answeredQuestion = new EventEmitter<number>();

  answerForm: FormGroup;

  errorMatcher = new WhenDirtyAndInvalidMatcher();

  answered = false;
  answeredCorrectly = false;

  answer = new FormControl('', [Validators.required, Validators.min(1), Validators.max(144)]);

  constructor(private readonly formBuilder: FormBuilder) {
    this.answerForm = this.formBuilder.group({ answer: this.answer });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question) {
      this.answered = this.question.answers.length > 0;
      if (!this.answered) {
        this.answer.reset();
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
