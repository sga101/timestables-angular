import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css']
})
export class QuestionContainerComponent implements OnInit {
  question$: Observable<Question>;
  questionHistory$: Observable<Question[]>;

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit() {
    this.question$ = this.questionService.questions$;
    this.questionHistory$ = this.questionService.questionHistory$;
  }

  getNextQuestion() {
    this.questionService.generateQuestion();
  }

  answeredQuestion(answer: number) {
    this.questionService.answerQuestion(answer);
  }
}
