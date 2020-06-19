import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { HistoryService } from './history.service';
import { QuestionService } from './question.service';
import { ResultsService } from './results.service';

const defaultQuestions = 20;

export type GameStatus = 'Setup' | 'Playing' | 'Finished';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  remaining$: Observable<number>;
  isMultiChoice$: Observable<boolean>;
  gameStatus$: Observable<GameStatus>;

  private gameStatus: GameStatus = 'Setup';
  private gameStatusSubject: BehaviorSubject<GameStatus>;

  private questionsAnswered: number;
  private totalQuestions: number;
  private remainingSubject: BehaviorSubject<number>;

  private isMultiChoice = true;
  private isMultiChoiceSubject: BehaviorSubject<boolean>;

  constructor(
    private questionsService: QuestionService,
    private resultsService: ResultsService,
    private historyService: HistoryService
  ) {
    this.gameStatusSubject = new BehaviorSubject(this.gameStatus);
    this.gameStatus$ = this.gameStatusSubject.asObservable();

    this.isMultiChoiceSubject = new BehaviorSubject(this.isMultiChoice);
    this.isMultiChoice$ = this.isMultiChoiceSubject.asObservable();

    this.remainingSubject = new BehaviorSubject(defaultQuestions);
    this.remaining$ = this.remainingSubject.asObservable();

    this.questionsService.questions$
      .pipe(
        filter((q) => !!q),
        map((q) => this.handleAnswer(q))
      )
      .subscribe();
  }

  private handleAnswer(q: Question): void {
    if (q.answeredCorrectly) {
      this.questionsAnswered++;
      this.historyService.addQuestion(q);
      const remainingQuestions = this.totalQuestions - this.questionsAnswered;
      this.remainingSubject.next(remainingQuestions);
      if (remainingQuestions > 0) {
        this.provideNextQuestion();
      } else {
        this.endGame();
      }
    }
  }

  private provideNextQuestion() {
    timer(500).subscribe(() => this.questionsService.nextQuestion());
  }

  setMultiChoiceMode(isMultiChoice: boolean): void {
    if (this.isMultiChoice !== isMultiChoice) {
      this.isMultiChoice = isMultiChoice;
      this.isMultiChoiceSubject.next(this.isMultiChoice);
    }
  }

  changeSettings(): void {
    this.setGameStatus('Setup');
  }

  reset(questionsToAsk: number = defaultQuestions): void {
    this.setGameStatus('Playing');
    this.questionsAnswered = 0;
    this.totalQuestions = questionsToAsk;
    this.historyService.archive();
    this.questionsService.nextQuestion();
  }

  private setGameStatus(status: GameStatus) {
    this.gameStatus = status;
    this.gameStatusSubject.next(this.gameStatus);
  }

  private endGame() {
    timer(500).subscribe(() => {
      this.resultsService.publishResults();
      this.setGameStatus('Finished');
    });
  }
}
