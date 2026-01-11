import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { QuestionService } from './question.service';
import { RandomNumbersService } from './random-numbers.service';

export type Choices = number[];

@Injectable({
  providedIn: 'root'
})
export class MultiChoiceAnswersService {
  private questionsService = inject(QuestionService);
  private randomNumbersService = inject(RandomNumbersService);

  private choicesSubject: BehaviorSubject<Choices>;

  public choices$: Observable<Choices>;

  constructor() {
    this.choicesSubject = new BehaviorSubject<Choices>([]);
    this.choices$ = this.choicesSubject.asObservable();
    this.questionsService.questions$.pipe(filter((q) => !q || q.answers.length === 0)).subscribe((q) => {
      const choices: Choices = generateChoices(q, this.randomNumbersService);
      const shuffled = this.shuffle(choices);
      this.choicesSubject.next(shuffled);
    });
  }

  shuffle<T>(array: T[]): T[] {
    const result = array.map((a) => a);
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
}

export function generateChoices(q: Question, randomNumbersService: RandomNumbersService): Choices {
  const choices: Choices = [];

  if (!q) return choices;

  // add correct answer
  choices.push(q.x * q.y);

  // push q.x - 1 * q.y (unless x = 1 in which case, push q.x + 1 * q.y)
  if (q.x > 1) {
    choices.push(Math.min(q.x - 1, 1) * q.y);
  } else {
    choices.push(2 * q.y);
  }

  // if x == y then push x * (x + 2) or x * (x - 2)
  if (q.x == q.y) {
    if (q.x < 11) {
      choices.push(q.x * (q.x + 2));
    } else {
      choices.push(q.x * (q.x - 2));
    }
  } else {
    if (q.y > 1) {
      choices.push(q.x * (q.y - 1));
    } else {
      choices.push(q.x * 2);
    }
  }
  let randomAnswer = choices[0];
  while (choices.find((c) => c === randomAnswer)) {
    randomAnswer = randomNumbersService.getRandomNumber(1, 12) * randomNumbersService.getRandomNumber(1, 12);
  }
  choices.push(randomAnswer);
  return choices;
}
