import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf]
})
export class QuestionComponent {
  @Input() question: Question;
}
