import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() questionHistory: Question[];

  total = 0;
  rightFirstTime = 0;
  totalTime = 0;
  questionsPerSecond = 0;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes.questionHistory && !!this.questionHistory) {
      this.total = this.questionHistory.length;
      if (this.total > 0) {
        this.totalTime = Math.floor(
          (Date.now() - this.questionHistory[0].startTime) / 1000
        );
        this.questionsPerSecond = this.totalTime / this.questionHistory.length;
        this.rightFirstTime = this.questionHistory.filter(
          q => q.answers.length === 1
        ).length;
      }
      this.cdr.markForCheck();
    }
  }
}
