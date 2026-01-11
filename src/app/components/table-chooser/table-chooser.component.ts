import { Component, Input } from '@angular/core';
import { TableSelection } from '../../models/table-selection.model';
import { TableSelectionService } from '../../services/table-selection.service';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-table-chooser',
    templateUrl: './table-chooser.component.html',
    styleUrls: ['./table-chooser.component.css'],
    imports: [MatButton, NgClass]
})
export class TableChooserComponent {
  @Input() selected: TableSelection[];

  constructor(private tableSelectionService: TableSelectionService) {}

  toggled(item: TableSelection): void {
    this.tableSelectionService.toggle(item);
  }

  trackBy(_: number, item: TableSelection): number {
    return item.table;
  }
}
