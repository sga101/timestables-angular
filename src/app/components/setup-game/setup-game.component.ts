import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableSelection } from '../../models/table-selection.model';
import { GameService } from '../../services/game.service';
import { TableSelectionService } from '../../services/table-selection.service';

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

  questionsToAnswer = '20';

  multiChoiceChanged(value: boolean): void {
    this.gameService.setMultiChoiceMode(!value);
  }

  questionsToAnswerChanged(value: number): void {
    this.gameService.setMultiChoiceMode(!value);
  }

  startGame(): void {
    this.gameService.reset(parseInt(this.questionsToAnswer, 10));
  }
}
