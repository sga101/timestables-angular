import { Component, Input } from '@angular/core';
import { TableSelection } from 'src/app/models/table-selection.model';
import { TableSelectionService } from 'src/app/services/table-selection.service';

@Component({
  selector: 'app-table-chooser',
  templateUrl: './table-chooser.component.html',
  styleUrls: ['./table-chooser.component.css']
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
