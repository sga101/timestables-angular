import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { Question } from 'src/app/models/question.model';
import { MultipleChoicesAnswersComponent } from './multiple-choices-answers.component';
import { QuestionComponent } from '../question/question.component';
import { AnswerFeedbackComponent } from '../answer-feedback/answer-feedback.component';

@Component({
  selector: 'app-question',
  template: '<span class="x">{{question.x}}</span><span class="y">{{question.y}}</span>',
  imports: [MatButtonModule]
})
export class MockQuestionComponent {
  @Input() question: Question;
}

@Component({
  selector: 'app-answer-feedback',
  template: '<span id="isCorrect">{{question.answeredCorrectly}}</span>',
  imports: [MatButtonModule]
})
export class MockAnswerFeedbackComponent {
  @Input() question: Question;
}

describe('MultipleChoicesAnswersComponent', () => {
  let component: MultipleChoicesAnswersComponent;
  let fixture: ComponentFixture<MultipleChoicesAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MultipleChoicesAnswersComponent, MockQuestionComponent, MockAnswerFeedbackComponent]
    })
      .overrideComponent(MultipleChoicesAnswersComponent, {
        remove: { imports: [QuestionComponent, AnswerFeedbackComponent] },
        add: { imports: [MockAnswerFeedbackComponent, MockQuestionComponent] }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoicesAnswersComponent);
    component = fixture.componentInstance;
    component.choices = [1, 2, 3, 4];
    const x = 1;
    const y = 2;
    const startTime = Date.now();

    component.question = {
      x,
      y,
      startTime,
      answers: [],
      endTime: 0,
      answered: false,
      answeredCorrectly: false,
      currentAnswer: ''
    };

    fixture.detectChanges();
  });

  it('should render the question', () => {
    const x = fixture.nativeElement.querySelector('.x');
    const y = fixture.nativeElement.querySelector('.y');
    expect(x.textContent).toEqual('1');
    expect(y.textContent).toEqual('2');
  });

  it('should emit the answer', (done) => {
    const sub = component.answeredQuestion.subscribe((a) => {
      expect(a).toEqual(1);
      done();
    });
    component.answerQuestion(1);
  });
});
