import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { CalculationsService } from 'src/app/services/calculations.service';
import { GameService } from 'src/app/services/game.service';
import { HistoryService } from 'src/app/services/history.service';
import { MultiChoiceAnswersService } from 'src/app/services/multi-choice-answers.service';
import { QuestionService } from 'src/app/services/question.service';
import { RandomNumbersService } from 'src/app/services/random-numbers.service';
import { ResultsService } from 'src/app/services/results.service';
import { SummaryService } from 'src/app/services/summary.service';
import { TableSelectionService } from 'src/app/services/table-selection.service';
import { TimerService } from 'src/app/services/timer.service';
import { QuestionContainerComponent } from './question-container.component';

describe('QuestionContainerComponent', () => {
  let component: QuestionContainerComponent;
  let fixture: ComponentFixture<QuestionContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [QuestionContainerComponent],
      providers: [
        QuestionService,
        SummaryService,
        ResultsService,
        HistoryService,
        GameService,
        MultiChoiceAnswersService,
        TimerService,
        RandomNumbersService,
        TableSelectionService,
        CalculationsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
