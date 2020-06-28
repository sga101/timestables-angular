import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableSelection } from '../models/table-selection.model';

@Injectable({
  providedIn: 'root'
})
export class TableSelectionService {
  selected$: Observable<TableSelection[]>;

  private selected: TableSelection[];
  private selectedSubject: BehaviorSubject<TableSelection[]>;

  constructor() {
    const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.selected = tables.map((t) => ({ table: t, selected: true }));
    this.selectedSubject = new BehaviorSubject(this.selected);
    this.selected$ = this.selectedSubject.asObservable();
  }

  toggle(selectedTable: TableSelection): void {
    // do not allow last item to be toggled
    if (this.selected.every((t) => t.table === selectedTable.table || t.selected === false)) {
      return;
    }
    const toggledTable = { ...selectedTable, selected: !selectedTable.selected };
    const exchange = (current: TableSelection) => (current.table === toggledTable.table ? toggledTable : current);
    this.selected = this.selected.map(exchange);
    this.selectedSubject.next(this.selected);
  }
}
