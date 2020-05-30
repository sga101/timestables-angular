export interface Question {
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  answers: Answer[];
  answered: boolean;
  answeredCorrectly: boolean;
}

export interface Answer {
  answer: number;
  correct: boolean;
  timeTaken: number;
}
