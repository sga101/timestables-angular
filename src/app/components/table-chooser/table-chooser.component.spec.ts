import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChooserComponent } from './table-chooser.component';

describe('TableChooserComponent', () => {
  let component: TableChooserComponent;
  let fixture: ComponentFixture<TableChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableChooserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
