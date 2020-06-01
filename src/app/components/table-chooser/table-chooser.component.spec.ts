import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TableChooserComponent } from './table-chooser.component';
import { MatCardModule } from '@angular/material/card';

describe('TableChooserComponent', () => {
  let component: TableChooserComponent;
  let fixture: ComponentFixture<TableChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonToggleModule, MatCardModule],
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
