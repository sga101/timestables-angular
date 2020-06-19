import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSummary } from '../components/summary/summary.component';
import { CalculationsService } from './calculations.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private summarySubject: BehaviorSubject<TableSummary[]>;

  summary$: Observable<TableSummary[]>;

  constructor(private historyService: HistoryService, private calculationsService: CalculationsService) {
    this.summarySubject = new BehaviorSubject([]);
    this.summary$ = this.summarySubject.asObservable();
    this.historyService.questionHistory$
      .pipe(map((questions) => this.summarySubject.next(this.calculationsService.getSummaryForAllTables(questions))))
      .subscribe();
  }
}
