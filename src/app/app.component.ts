import { Component } from '@angular/core';
import { QuestionContainerComponent } from './containers/question-container/question-container.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [QuestionContainerComponent]
})
export class AppComponent {
  title = 'timesTables';
}
