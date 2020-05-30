import { TestBed } from '@angular/core/testing';

import { RandomNumbersService } from './random-numbers.service';

describe('RandomNumbersService', () => {
  let service: RandomNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
