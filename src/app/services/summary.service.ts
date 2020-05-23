import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSummary } from '../components/summary/summary.component';
import { QuestionService } from './question.service';
import { CalculationsService } from './calculations.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private summarySubject: BehaviorSubject<TableSummary[]>;

  summary$: Observable<TableSummary[]>;

  constructor(private questionsService: QuestionService, private calculationsService: CalculationsService) {
    this.summarySubject = new BehaviorSubject([]);
    this.summary$ = this.summarySubject.asObservable();
    this.questionsService.questionHistory$
      .pipe(map((questions) => this.summarySubject.next(this.calculationsService.getSummaryForAllTables(questions))))
      .subscribe();
  }
}
