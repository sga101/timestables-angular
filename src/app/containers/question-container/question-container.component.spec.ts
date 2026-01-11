import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { CalculationsService } from '../../services/calculations.service';
import { GameService } from '../../services/game.service';
import { HistoryService } from '../../services/history.service';
import { MultiChoiceAnswersService } from '../../services/multi-choice-answers.service';
import { QuestionService } from '../../services/question.service';
import { RandomNumbersService } from '../../services/random-numbers.service';
import { ResultsService } from '../../services/results.service';
import { SummaryService } from '../../services/summary.service';
import { TableSelectionService } from '../../services/table-selection.service';
import { TimerService } from '../../services/timer.service';
import { QuestionContainerComponent } from './question-container.component';

describe('QuestionContainerComponent', () => {
  let component: QuestionContainerComponent;
  let fixture: ComponentFixture<QuestionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
