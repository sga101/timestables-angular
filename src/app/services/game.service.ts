import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { HistoryService } from './history.service';
import { QuestionService } from './question.service';
import { ResultsService } from './results.service';

const defaultQuestions = 2;

export interface Progress {
  currentQuestion: number;
  totalQuestions: number;
}

export type GameStatus = 'Setup' | 'Playing' | 'Finished';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  progress$: Observable<Progress>;
  isMultiChoice$: Observable<boolean>;
  gameStatus$: Observable<GameStatus>;

  private gameStatus: GameStatus = 'Setup';
  private gameStatusSubject: BehaviorSubject<GameStatus>;

  private questionsAnswered: number;
  private totalQuestions: number;
  private progressSubject: BehaviorSubject<Progress>;

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

    this.progressSubject = new BehaviorSubject({ currentQuestion: 1, totalQuestions: defaultQuestions });
    this.progress$ = this.progressSubject.asObservable();

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
      if (remainingQuestions > 0) {
        this.scheduleNextQuestion();
      } else {
        this.endGame();
      }
    }
  }

  private scheduleNextQuestion() {
    timer(500).subscribe(() => {
      this.nextQuestion();
    });
  }

  private nextQuestion() {
    this.questionsService.nextQuestion();
    this.progressSubject.next({ currentQuestion: this.questionsAnswered + 1, totalQuestions: this.totalQuestions });
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
    this.nextQuestion();
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