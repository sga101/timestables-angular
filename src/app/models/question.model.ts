export interface Question {
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  answers: Answer[];
}

export interface Answer {
  answer: number;
  correct: boolean;
  timeTaken: number;
}
