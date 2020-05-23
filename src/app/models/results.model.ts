import { Question } from './question.model';

export interface Results {
  totalTime: number;
  totalQuestions: number;
  averageTime: number;
  wrongAnswers: Question[];
  starRating: number;
  fastestAnswer: Question;
  fastestTable: number;
  slowestTable: number;
}
