import { TestBed } from '@angular/core/testing';

import { MultiChoiceAnswersService } from './multi-choice-answers.service';

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
