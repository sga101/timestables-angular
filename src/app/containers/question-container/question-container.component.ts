import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSummary } from 'src/app/components/summary/summary.component';
import { Question } from 'src/app/models/question.model';
import { Results } from 'src/app/models/results.model';
import { GameService } from 'src/app/services/game.service';
import { HistoryService } from 'src/app/services/history.service';
import { Choices, MultiChoiceAnswersService } from 'src/app/services/multi-choice-answers.service';
import { QuestionService } from 'src/app/services/question.service';
import { ResultsService } from 'src/app/services/results.service';
import { SummaryService } from 'src/app/services/summary.service';

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
  isMultiChoiceMode$: Observable<boolean>;
  questionsVisible$: Observable<boolean>;
  resultsVisible$: Observable<boolean>;

  constructor(
    private readonly questionService: QuestionService,
    private readonly historyService: HistoryService,
    private readonly summaryService: SummaryService,
    private readonly resultsService: ResultsService,
    private readonly choicesService: MultiChoiceAnswersService,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.question$ = this.questionService.questions$;
    this.questionHistory$ = this.historyService.questionHistory$;
    this.startTime$ = this.question$.pipe(map((q) => q.startTime));
    this.summaryData$ = this.summaryService.summary$;
    this.results$ = this.resultsService.results$;
    this.choices$ = this.choicesService.choices$;
    this.isMultiChoiceMode$ = this.gameService.isMultiChoice$;
    this.questionsVisible$ = this.gameService.gameStatus$.pipe(map((s) => s === 'Playing'));
    this.resultsVisible$ = this.gameService.gameStatus$.pipe(map((s) => s === 'Finished'));
  }
  answeredQuestion(answer: number): void {
    this.questionService.answerQuestion(answer);
  }

  startAgain(): void {
    this.gameService.reset();
  }

  changeSettings(): void {
    this.gameService.changeSettings();
  }
}
