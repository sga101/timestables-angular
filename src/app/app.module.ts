import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TimerComponent } from './components/timer/timer.component';
import { QuestionContainerComponent } from './containers/question-container/question-container.component';
import { AutoFocusDirective } from './focus.directive';
import { ResultsComponent } from './components/results/results.component';
import { MultipleChoicesAnswersComponent } from './components/multiple-choices-answers/multiple-choices-answers.component';
import { KeyedInAnswerComponent } from './components/keyed-in-answer/keyed-in-answer.component';
import { AnswerFeedbackComponent } from './components/answer-feedback/answer-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionContainerComponent,
    TimerComponent,
    SummaryComponent,
    AutoFocusDirective,
    ResultsComponent,
    MultipleChoicesAnswersComponent,
    KeyedInAnswerComponent,
    AnswerFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
