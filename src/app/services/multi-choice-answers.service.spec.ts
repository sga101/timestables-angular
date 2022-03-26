import { TestBed } from '@angular/core/testing';
import { filter, map, Observable, take, withLatestFrom } from 'rxjs';
import { Question } from '../models/question.model';
import { Choices, generateChoices, MultiChoiceAnswersService } from './multi-choice-answers.service';
import { QuestionService } from './question.service';
import { RandomNumbersService } from './random-numbers.service';
import { TableSelectionService } from './table-selection.service';
import { TimerService } from './timer.service';

function testChoices(
  choices$: Observable<Choices>,
  questions$: Observable<Question>,
  predicate: (choice: number, question: Question) => boolean,
  done
) {
  choices$
    .pipe(
      withLatestFrom(questions$),
      take(1),
      map(([choices, question]) => {
        const matcher = (c) => predicate(c, question);
        expect(choices.find(matcher)).not.toBeNull();
        done();
      })
    )
    .subscribe();
}
describe('MultiChoiceAnswersService', () => {
  let service: MultiChoiceAnswersService;
  let questionService: QuestionService;
  let questions$: Observable<Question>;
  let choices$: Observable<Choices>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiChoiceAnswersService, QuestionService, RandomNumbersService, TableSelectionService, TimerService]
    });
    questionService = TestBed.inject(QuestionService);
    service = TestBed.inject(MultiChoiceAnswersService);
    questions$ = questionService.questions$.pipe(filter((q) => !!q));
    choices$ = service.choices$.pipe(filter((c) => c.length === 4));
    questionService.nextQuestion();
  });

  it('should generate the correct answer', (done) => {
    testChoices(choices$, questions$, (c, q) => c === q.x * q.y, done);
  });
});

describe('generateChoices', () => {
  const randomNumbersService = new RandomNumbersService();

  const sampleQuestion: Question = {
    x: 1,
    y: 2,
    answered: false,
    answeredCorrectly: false,
    answers: [],
    currentAnswer: null,
    startTime: Date.now(),
    endTime: undefined
  };

  it('should include the right answer', () => {
    const choices = generateChoices(sampleQuestion, randomNumbersService);
    expect(choices.length).toEqual(4);
    expect(choices[0]).toEqual(sampleQuestion.x * sampleQuestion.y);
  });

  it('should include the x + 1 * y ', () => {
    const choices = generateChoices(sampleQuestion, randomNumbersService);
    expect(choices.length === 4);
    expect(choices[1]).toEqual((sampleQuestion.x + 1) * sampleQuestion.y);
  });

  it('should include 2 * y  when x = 1', () => {
    const choices = generateChoices({ ...sampleQuestion, x: 1 }, randomNumbersService);
    expect(choices.length === 4);
    expect(choices[1]).toEqual(2 * sampleQuestion.y);
  });

  it('should include the x * (y - 1) ', () => {
    const choices = generateChoices(sampleQuestion, randomNumbersService);
    expect(choices.length).toEqual(4);
    expect(choices[2]).toEqual(sampleQuestion.x * (sampleQuestion.y - 1));
  });

  it('should include 2 * x  when y = 1', () => {
    const q2 = { ...sampleQuestion, x: 12, y: 1 };
    const choices = generateChoices(q2, randomNumbersService);
    expect(choices.length === 4);
    expect(choices[2]).toEqual(2 * q2.x);
  });

  it('should not generate duplicate answers for x squared', () => {
    for (let i = 1; i < 13; i++) {
      const question: Question = { ...sampleQuestion, x: i, y: i };
      const choices = generateChoices(question, randomNumbersService);
      for (let j = 0; j < choices.length - 1; j++) {
        expect(choices[j]).not.toEqual(choices[j + 1]);
      }
    }
  });
});
