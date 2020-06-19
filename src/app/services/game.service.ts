import { Injectable } from '@angular/core';
import { QuestionService } from './question.service';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ResultsService } from './results.service';
import { HistoryService } from './history.service';

const defaultQuestions = 2;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  remaining$: Observable<number>;
  private remainingSubject: BehaviorSubject<number>;
  private questionsAnswered: number;
  private totalQuestions: number;

  constructor(
    private questionsService: QuestionService,
    private resultsService: ResultsService,
    private historyService: HistoryService
  ) {
    this.remainingSubject = new BehaviorSubject(defaultQuestions);
    this.remaining$ = this.remainingSubject.asObservable();
    this.reset(defaultQuestions);
    this.questionsService.questions$
      .pipe(
        filter((q) => !!q),
        map((q) => {
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
        })
      )
      .subscribe();
  }

  private provideNextQuestion() {
    timer(500).subscribe(() => this.questionsService.nextQuestion());
  }

  reset(questionsToAsk: number = defaultQuestions): void {
    this.questionsAnswered = 0;
    this.totalQuestions = questionsToAsk;
    this.resultsService.reset();
    this.historyService.archive();
    this.questionsService.nextQuestion();
  }

  private endGame() {
    timer(500).subscribe(() => {
      this.questionsService.clear();
      this.resultsService.publishResults();
    });
  }
}
