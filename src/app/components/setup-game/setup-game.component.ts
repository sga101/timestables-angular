import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSelection } from 'src/app/models/table-selection.model';
import { GameService } from 'src/app/services/game.service';
import { TableSelectionService } from 'src/app/services/table-selection.service';

@Component({
  selector: 'app-setup-game',
  templateUrl: './setup-game.component.html',
  styleUrls: ['./setup-game.component.css']
})
export class SetupGameComponent {
  selectedTables$: Observable<TableSelection[]>;
  isMultiChoice$: Observable<boolean>;
  isVisible$: Observable<boolean>;

  constructor(
    private readonly selectedTablesService: TableSelectionService,
    private readonly gameService: GameService
  ) {
    this.selectedTables$ = this.selectedTablesService.selected$;
    this.isMultiChoice$ = this.gameService.isMultiChoice$;
    this.isVisible$ = this.gameService.gameStatus$.pipe(map((s) => s === 'Setup'));
  }

  multiChoiceChanged(value: boolean): void {
    this.gameService.setMultiChoiceMode(!value);
  }

  startGame(): void {
    this.gameService.reset();
  }
}
