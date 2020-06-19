import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { TableSelection } from '../models/table-selection.model';
import { RandomNumbersService } from './random-numbers.service';
import { TableSelectionService } from './table-selection.service';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  selectedTables: TableSelection[];

  constructor(
    private timerService: TimerService,
    private randomNumbersService: RandomNumbersService,
    private tableSelectionService: TableSelectionService
  ) {
    this.tableSelectionService.selected$.pipe(tap((selected) => (this.selectedTables = selected))).subscribe();
    this.questionSubject = new BehaviorSubject<Question>(this.currentQuestion);
    this.questions$ = this.questionSubject.asObservable();
  }

  private questionSubject: BehaviorSubject<Question>;
  private currentQuestion: Question;

  questions$: Observable<Question>;
  remaining$: Observable<number>;

  nextQuestion(): void {
    this.update(this.generateQuestion());
    this.timerService.startTimer();
  }

  clear(): void {
    this.update(null);
  }

  answerQuestion(answer: number): void {
    const correctAnswer = this.currentQuestion.x * this.currentQuestion.y;
    const correct = answer === correctAnswer;
    const timeTaken = Date.now() - this.currentQuestion.startTime;
    const answeredQuestion: Question = {
      ...this.currentQuestion,
      answers: this.currentQuestion.answers.concat({
        answer,
        correct,
        timeTaken
      }),
      answered: true,
      answeredCorrectly: correct,
      endTime: Date.now()
    };

    this.update(answeredQuestion);
  }

  private update(question: Question): void {
    this.currentQuestion = question;
    this.questionSubject.next(this.currentQuestion);
  }

  generateQuestion(): Question {
    const validTables = this.selectedTables.filter((t) => t.selected);
    const index = this.randomNumbersService.getRandomNumber(0, validTables.length - 1);
    const y = validTables[index].table;

    // Ensure the next question is different
    const currentX = (this.currentQuestion && this.currentQuestion.x) || 0;
    let x = currentX;
    while (x === currentX) {
      x = this.randomNumbersService.getRandomNumber(1, 12);
    }

    return { x, y, startTime: Date.now(), answers: [], endTime: 0, answered: false, answeredCorrectly: false };
  }
}
