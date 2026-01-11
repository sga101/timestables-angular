import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class QuestionComponent {
  @Input() question: Question;
}
