import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Question } from 'src/app/models/question.model';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() initialStartTime: number;
  @Input() question: Question;
  @Output() getNextQuestion = new EventEmitter<void>();
  @Output() answeredQuestion = new EventEmitter<number>();

  answerForm: FormGroup;

  answered = false;
  answeredCorrectly = false;

  answer = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(144)
  ]);

  constructor(private readonly formBuilder: FormBuilder) {
    this.answerForm = this.formBuilder.group({ answer: this.answer });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question) {
      this.answered = this.question.answers.length > 0;
      if (!this.answered) {
        this.answer.reset();
      }
      this.answeredCorrectly =
        this.question.answers.filter(a => a.correct).length > 0;
    }
  }

  answerQuestion(answer: string) {
    const parsed = parseInt(answer, 10);
    if (!isNaN(parsed)) {
      this.answeredQuestion.emit(parsed);
    }
  }
}
