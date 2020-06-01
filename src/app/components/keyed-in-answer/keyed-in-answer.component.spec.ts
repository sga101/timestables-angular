import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyedInAnswerComponent } from './keyed-in-answer.component';

describe('KeyedInAnswerComponent', () => {
  let component: KeyedInAnswerComponent;
  let fixture: ComponentFixture<KeyedInAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KeyedInAnswerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyedInAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
