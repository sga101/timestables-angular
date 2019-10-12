import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Observable } from 'rxjs';
import { Question, Answer } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css']
})
export class QuestionContainerComponent implements OnInit {
  question$: Observable<Question>;

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit() {
    this.question$ = this.questionService.questions$;
  }

  getNextQuestion() {
    this.questionService.generateQuestion();
  }

  answeredQuestion(answer: number) {
    this.questionService.answerQuestion(answer);
  }
}
