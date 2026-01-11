import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { Results } from '../models/results.model';
import { CalculationsService } from './calculations.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private calculationService = inject(CalculationsService);
  private historyService = inject(HistoryService);

  private resultsSubject: BehaviorSubject<Results>;
  results$: Observable<Results>;

  constructor() {
    this.resultsSubject = new BehaviorSubject<Results>(null);
    this.results$ = this.resultsSubject.asObservable();
  }

  publishResults(): void {
    this.historyService.questionHistory$
      .pipe(
        take(1),
        map((q) => this.buildResults(q))
      )
      .subscribe();
  }

  buildResults(questions: Question[]): void {
    const allSummaries = this.calculationService.getSummaryForAllTables(questions);
    const summary = allSummaries.pop();
    const fastest = allSummaries.reduce(
      (acc, curr) => {
        if (curr.averageTimePerQuestion < acc.time) {
          return { table: curr.table, time: curr.averageTimePerQuestion };
        } else {
          return acc;
        }
      },
      { table: 1, time: 1000000 }
    );

    const slowest = allSummaries.reduce(
      (acc, curr) => {
        if (curr.averageTimePerQuestion > acc.time) {
          return { table: curr.table, time: curr.averageTimePerQuestion };
        } else {
          return acc;
        }
      },
      { table: 1, time: 0 }
    );

    const results: Results = {
      totalQuestions: summary.answered,
      averageTime: summary.averageTimePerQuestion,
      totalTime: summary.totalTime,
      fastestTable: fastest.table,
      slowestTable: slowest.table,
      fastestAnswer: questions.reduce(
        (acc, curr) =>
          curr.answers.find((a) => a.correct).timeTaken < Math.min(5, curr.endTime - curr.startTime) ? curr : acc,
        questions[0]
      ),
      wrongAnswers: questions.filter((q) => q.answers.length > 1),
      starRating: 5
    };
    this.resultsSubject.next(results);
  }
}
