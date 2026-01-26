import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from '../../models/question.model';


@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class QuestionComponent {
  @Input() question: Question;
}
