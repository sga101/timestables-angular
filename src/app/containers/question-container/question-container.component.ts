import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { map } from 'rxjs/operators';
import { SummaryService } from 'src/app/services/summary.service';
import { TableSummary } from 'src/app/components/summary/summary.component';

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
  initialStartTime: number;
  startTime$: Observable<number>;
  completed$: Observable<boolean>;

  constructor(private readonly questionService: QuestionService, private summaryService: SummaryService) {
    this.initialStartTime = questionService.initialStartTime;
  }

  ngOnInit(): void {
    this.question$ = this.questionService.questions$;
    this.questionHistory$ = this.questionService.questionHistory$;
    this.startTime$ = this.question$.pipe(map((q) => q.startTime));
    this.completed$ = this.question$.pipe(map((q) => q.answers.filter((a) => a.correct).length > 0));
    this.summaryData$ = this.summaryService.summary$;
  }

  getNextQuestion(): void {
    this.questionService.generateQuestion();
  }

  answeredQuestion(answer: number): void {
    this.questionService.answerQuestion(answer);
  }
}
