import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
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
