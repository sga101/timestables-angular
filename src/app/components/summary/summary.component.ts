import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Question } from 'src/app/models/question.model';

export interface TableSummary {
  table: number;
  answered: number;
  totalTime: number;
  averageTimePerQuestion: number;
  rightFirstTime: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnChanges {
  @Input() questionHistory: Question[];

  summaryData: TableSummary[] = [];

  columnsToDisplay = ['table', 'answered', 'totalTime', 'timePerQuestion', 'rightFirstTime'];

  constructor(private readonly cdr: ChangeDetectorRef) {}

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
      result.totalTime = questions.reduce((acc, curr) => acc + curr.endTime - curr.startTime, 0);
      result.averageTimePerQuestion = result.totalTime / result.answered;
      result.rightFirstTime = questions.filter((q) => q.answers.length === 1).length;
    }
    return result;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.questionHistory && !!this.questionHistory) {
      let data: TableSummary[] = [];

      for (let i = 1; i < 13; i++) {
        data.push(
          this.getSummary(
            i,
            this.questionHistory.filter((q) => q.y === i)
          )
        );
      }
      data = data.sort((a, b) => b.averageTimePerQuestion - a.averageTimePerQuestion);

      data.push(this.getSummary(0, this.questionHistory));
      this.summaryData = data;
      this.cdr.markForCheck();
    }
  }
}
