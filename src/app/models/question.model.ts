export interface Question {
  x: number;
  y: number;
  startTime: number;
  answers: Answer[];
}

export interface Answer {
  answer: number;
  correct: boolean;
  timeTaken: number;
}
