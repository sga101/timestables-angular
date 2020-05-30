import { Injectable } from '@angular/core';
import { TableSelection } from '../models/table-selection.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableSelectionService {
  selected: TableSelection[];
  selected$: Observable<TableSelection[]>;
  selectedSubject: BehaviorSubject<TableSelection[]>;

  constructor() {
    const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    this.selected = tables.map((t) => ({ table: t, selected: true }));

    this.selectedSubject = new BehaviorSubject(this.selected);
    this.selected$ = this.selectedSubject.asObservable();
  }

  toggle(selectedTable: TableSelection): void {
    const toggledTable = { ...selectedTable, selected: !selectedTable.selected };
    const exchange = (current: TableSelection) => (current.table === toggledTable.table ? toggledTable : current);
    this.selected = this.selected.map(exchange);
    this.selectedSubject.next(this.selected);

    // reselect item if it was the last selected item
    if (this.selected.every((t) => t.selected === false)) {
      // use set timeout to ensure toggle back occurs after change
      setTimeout(() => this.toggle(toggledTable));
    }
  }
}
