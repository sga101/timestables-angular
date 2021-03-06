import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MultipleChoicesAnswersComponent } from './multiple-choices-answers.component';

describe('MultipleChoicesAnswersComponent', () => {
  let component: MultipleChoicesAnswersComponent;
  let fixture: ComponentFixture<MultipleChoicesAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [MultipleChoicesAnswersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoicesAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
