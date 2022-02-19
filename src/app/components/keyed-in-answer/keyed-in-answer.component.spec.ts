import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerFeedbackComponent } from '../answer-feedback/answer-feedback.component';
import { KeyedInAnswerComponent } from './keyed-in-answer.component';

describe('KeyedInAnswerComponent', () => {
  let component: KeyedInAnswerComponent;
  let fixture: ComponentFixture<KeyedInAnswerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [KeyedInAnswerComponent, AnswerFeedbackComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyedInAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
