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

  toggle(item: TableSelection): void {
    this.selected = this.selected.map((current) =>
      current.table === item.table ? { ...item, selected: !item.selected } : current
    );
    this.selectedSubject.next(this.selected);
  }
}
