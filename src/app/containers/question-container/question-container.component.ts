import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSummary, SummaryComponent } from '../../components/summary/summary.component';
import { Question } from '../../models/question.model';
import { Results } from '../../models/results.model';
import { GameService } from '../../services/game.service';
import { HistoryService } from '../../services/history.service';
import { Choices, MultiChoiceAnswersService } from '../../services/multi-choice-answers.service';
import { QuestionService } from '../../services/question.service';
import { ResultsService } from '../../services/results.service';
import { SummaryService } from '../../services/summary.service';
import { SetupGameComponent } from '../../components/setup-game/setup-game.component';
import { AsyncPipe } from '@angular/common';
import { MultipleChoicesAnswersComponent } from '../../components/multiple-choices-answers/multiple-choices-answers.component';
import { KeyedInAnswerComponent } from '../../components/keyed-in-answer/keyed-in-answer.component';
import { ResultsComponent } from '../../components/results/results.component';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SetupGameComponent,
    MultipleChoicesAnswersComponent,
    KeyedInAnswerComponent,
    ResultsComponent,
    SummaryComponent,
    AsyncPipe
]
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
  currentQuestion$: Observable<number>;
  totalQuestions$: Observable<number>;
  answerText$: Observable<string>;

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
    this.currentQuestion$ = this.gameService.progress$.pipe(map((p) => p.currentQuestion));
    this.totalQuestions$ = this.gameService.progress$.pipe(map((p) => p.totalQuestions));
    this.answerText$ = this.questionService.answerText$;
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
