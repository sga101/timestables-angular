import { Component, Input } from '@angular/core';

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
export class SummaryComponent {
  @Input() summaryData: TableSummary[];

  columnsToDisplay = ['table', 'answered', 'totalTime', 'timePerQuestion', 'rightFirstTime'];
}
