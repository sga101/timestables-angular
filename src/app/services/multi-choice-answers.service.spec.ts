import { TestBed } from '@angular/core/testing';
import { Question } from '../models/question.model';
import { generateChoices, MultiChoiceAnswersService } from './multi-choice-answers.service';
import { RandomNumbersService } from './random-numbers.service';

describe('MultiChoiceAnswersService', () => {
  let service: MultiChoiceAnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiChoiceAnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it('should not have duplicate answers', () => {
    for (let i = 0; i < 1000; i++) {
      const choices = generateChoices(sampleQuestion, randomNumbersService);
      for (let j = 0; j < choices.length - 1; j++) {
        expect(choices[j]).not.toEqual(choices[j + 1]);
      }
    }
  });
});
