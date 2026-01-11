import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [SummaryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
