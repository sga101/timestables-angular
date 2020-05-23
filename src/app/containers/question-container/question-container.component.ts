import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSummary } from 'src/app/components/summary/summary.component';
import { Question } from 'src/app/models/question.model';
import { Results } from 'src/app/models/results.model';
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
  startTime$: Observable<number>;
  results$: Observable<Results>;

  constructor(
    private readonly questionService: QuestionService,
    private summaryService: SummaryService,
    private resultsService: ResultsService
  ) {}

  ngOnInit(): void {
    this.question$ = this.questionService.questions$;
    this.questionHistory$ = this.questionService.questionHistory$;
    this.startTime$ = this.question$.pipe(map((q) => q.startTime));
    this.summaryData$ = this.summaryService.summary$;
    this.results$ = this.resultsService.results$;
  }
  answeredQuestion(answer: number): void {
    this.questionService.answerQuestion(answer);
  }

  startAgain(): void {
    this.questionService.reset();
  }
}
