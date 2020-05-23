import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question.model';
import { Results } from '../models/results.model';
import { CalculationsService } from './calculations.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private resultsSubject: Subject<Results>;
  results$: Observable<Results>;

  constructor(private calculationService: CalculationsService) {
    this.resultsSubject = new Subject<Results>();
    this.results$ = this.resultsSubject.asObservable();
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
      wrongAnswers: [],
      starRating: 5
    };
    this.resultsSubject.next(results);
  }

  reset(): void {
    this.resultsSubject.next(null);
  }
}
