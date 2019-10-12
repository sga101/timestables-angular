import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionComponent } from './components/question/question.component';
import { QuestionContainerComponent } from './containers/question-container/question-container.component';
import { AnswerComponent } from './components/answer/answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [AppComponent, QuestionComponent, QuestionContainerComponent, AnswerComponent, TimerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
