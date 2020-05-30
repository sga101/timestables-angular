import { Injectable } from '@angular/core';
import { QuestionService } from './question.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RandomNumbersService } from './random-numbers.service';
import { filter } from 'rxjs/operators';

export type Choices = number[];

@Injectable({
  providedIn: 'root'
})
export class MultiChoiceAnswersService {
  private choicesSubject: BehaviorSubject<Choices>;

  public choices$: Observable<Choices>;

  constructor(private questionsService: QuestionService, private randomNumbersService: RandomNumbersService) {
    this.choicesSubject = new BehaviorSubject<Choices>([]);
    this.choices$ = this.choicesSubject.asObservable();
    this.questionsService.questions$.pipe(filter((q) => q === null || q.answers.length == 0)).subscribe((q) => {
      const choices: Choices = [];
      if (q) {
        choices.push(q.x * q.y);
        if (q.x > 1) {
          choices.push(Math.min(q.x - 1, 1) * q.y);
        } else {
          choices.push(2 * q.y);
        }
        if (q.y > 1) {
          choices.push(q.x * Math.min(q.y - 1, 1));
        } else {
          choices.push(q.x * 2);
        }
        let randomAnswer = choices[0];
        while (choices.find((c) => c === randomAnswer)) {
          randomAnswer = randomNumbersService.getRandomNumber(1, 12) * randomNumbersService.getRandomNumber(1, 12);
        }
        choices.push(randomAnswer);
      }
      const shuffled = this.shuffle(choices);
      this.choicesSubject.next(shuffled);
    });
  }

  shuffle<T>(array: T[]): T[] {
    const result = array.map((a) => a);
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
}
