import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  questions$: Observable<Question>;
  answerText$: Observable<string>;

  constructor(
    private timerService: TimerService,
    private randomNumbersService: RandomNumbersService,
    private tableSelectionService: TableSelectionService
  ) {
    this.tableSelectionService.selected$.subscribe({ next: (selected) => (this.selectedTables = selected) });
    this.questionSubject = new BehaviorSubject<Question>(this.currentQuestion);
    this.questions$ = this.questionSubject.asObservable();
    this.answerText$ = this.questions$.pipe(map((q) => q.currentAnswer));
  }

  private questionSubject: BehaviorSubject<Question>;
  private currentQuestion: Question;

  nextQuestion(): void {
    this.update(this.generateQuestion());
    this.timerService.startTimer();
  }

  clear(): void {
    this.update(null);
  }

  answerQuestion(answer: number): void {
    if (this.currentQuestion.answeredCorrectly) {
      return;
    }
    const answeredQuestion: Question = updateModel(this.currentQuestion, answer, Date.now());

    this.update(answeredQuestion);
  }

  generateQuestion = (): Question =>
    generateNextQuestion(this.currentQuestion, this.selectedTables, Date.now(), this.randomNumbersService);

  private update(question: Question): void {
    this.currentQuestion = question;
    this.questionSubject.next(this.currentQuestion);
  }
}

export function updateModel(question: Question, answer: number, dateAnswered: number): Question {
  const correctAnswer = question.x * question.y;
  const correct = answer === correctAnswer;
  const timeTaken = dateAnswered - question.startTime;
  const answeredQuestion: Question = {
    ...question,
    currentAnswer: answer.toString(),
    answers: question.answers.concat({
      answer,
      correct,
      timeTaken
    }),
    answered: true,
    answeredCorrectly: correct,
    endTime: dateAnswered
  };
  return answeredQuestion;
}

export function generateNextQuestion(
  current: Question,
  selectedTables: TableSelection[],
  startTime: number,
  randomNumbers: RandomNumbersService
): Question {
  const validTables = selectedTables.filter((t) => t.selected);
  const index = randomNumbers.getRandomNumber(0, validTables.length - 1);
  const y = validTables[index].table;

  // Ensure the next question is different
  const currentX = (current && current.x) || 0;
  let x = currentX;
  while (x === currentX) {
    x = randomNumbers.getRandomNumber(1, 12);
  }

  return {
    x,
    y,
    startTime,
    answers: [],
    endTime: 0,
    answered: false,
    answeredCorrectly: false,
    currentAnswer: ''
  };
}
