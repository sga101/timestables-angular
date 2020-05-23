import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css']
})
export class QuestionContainerComponent implements OnInit {
  question$: Observable<Question>;
  questionHistory$: Observable<Question[]>;
  initialStartTime : number;
  startTime$: Observable<number>;
  completed$: Observable<boolean>;


  constructor(private readonly questionService: QuestionService) {
    this.initialStartTime = questionService.initialStartTime;
  }

  ngOnInit() {
    this.question$ = this.questionService.questions$;
    this.questionHistory$ = this.questionService.questionHistory$;
    this.startTime$ = this.question$.pipe(map(q=>q.startTime));
    this.completed$ = this.question$.pipe(map(q=>q.answers.filter(a => a.correct).length > 0));
  }
  

  getNextQuestion() {
    this.questionService.generateQuestion();
  }

  answeredQuestion(answer: number) {
    this.questionService.answerQuestion(answer);
  }
}
