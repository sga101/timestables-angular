import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSummary } from 'src/app/components/summary/summary.component';
import { Question } from 'src/app/models/question.model';
import { Results } from 'src/app/models/results.model';
import { TableSelection } from 'src/app/models/table-selection.model';
import { GameService } from 'src/app/services/game.service';
import { HistoryService } from 'src/app/services/history.service';
import { Choices, MultiChoiceAnswersService } from 'src/app/services/multi-choice-answers.service';
import { QuestionService } from 'src/app/services/question.service';
import { ResultsService } from 'src/app/services/results.service';
import { SummaryService } from 'src/app/services/summary.service';
import { TableSelectionService } from 'src/app/services/table-selection.service';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionContainerComponent implements OnInit {
  question$: Observable<Question>;
  questionHistory$: Observable<Question[]>;
  summaryData$: Observable<TableSummary[]>;
  choices$: Observable<Choices>;
  startTime$: Observable<number>;
  results$: Observable<Results>;
  selectedTables$: Observable<TableSelection[]>;

  constructor(
    private readonly questionService: QuestionService,
    private readonly historyService: HistoryService,
    private readonly summaryService: SummaryService,
    private readonly resultsService: ResultsService,
    private readonly choicesService: MultiChoiceAnswersService,
    private readonly selectedTablesService: TableSelectionService,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.question$ = this.questionService.questions$;
    this.questionHistory$ = this.historyService.questionHistory$;
    this.startTime$ = this.question$.pipe(map((q) => q.startTime));
    this.summaryData$ = this.summaryService.summary$;
    this.results$ = this.resultsService.results$;
    this.choices$ = this.choicesService.choices$;
    this.selectedTables$ = this.selectedTablesService.selected$;
  }
  answeredQuestion(answer: number): void {
    this.questionService.answerQuestion(answer);
  }

  startAgain(): void {
    this.gameService.reset();
  }
}
