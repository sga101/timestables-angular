import { Component, Input } from '@angular/core';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow
} from '@angular/material/table';
import { DecimalPipe } from '@angular/common';

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
  styleUrls: ['./summary.component.css'],
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DecimalPipe
  ]
})
export class SummaryComponent {
  @Input() summaryData: TableSummary[];

  columnsToDisplay = ['table', 'answered', 'totalTime', 'timePerQuestion', 'rightFirstTime'];
}
