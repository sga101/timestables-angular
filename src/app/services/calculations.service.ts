import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { TableSummary } from '../components/summary/summary.component';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {
  getSummaryForAllTables(questions: Question[]): TableSummary[] {
    const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const data = tables
      .map((table) =>
        this.getSummary(
          table,
          questions.filter((q) => q.y === table)
        )
      )
      .filter((q) => q.answered > 0)
      .sort((a, b) => b.averageTimePerQuestion - a.averageTimePerQuestion);

    data.push(this.getSummary(0, questions));
    return data;
  }

  getSummary(table: number, questions: Question[]): TableSummary {
    const result: TableSummary = {
      table,
      answered: 0,
      totalTime: 0,
      averageTimePerQuestion: 0,
      rightFirstTime: 0
    };

    result.answered = questions.length;
    if (result.answered > 0) {
      result.totalTime = questions.reduce((total, question) => total + this.getTimeForQuestion(question), 0);
      result.averageTimePerQuestion = result.totalTime / result.answered;
      result.rightFirstTime = questions.filter((q) => q.answers.length === 1).length;
    }
    return result;
  }

  getTimeForQuestion(question: Question): number {
    return question.endTime - question.startTime;
  }
}
