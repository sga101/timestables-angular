import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TableChooserComponent } from '../table-chooser/table-chooser.component';
import { SetupGameComponent } from './setup-game.component';

describe('SetupGameComponent', () => {
  let component: SetupGameComponent;
  let fixture: ComponentFixture<SetupGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupGameComponent, TableChooserComponent],
      imports: [FormsModule, MatButtonModule, MatRadioModule, MatSlideToggleModule, MatTableModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
