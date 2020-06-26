export interface Question {
  x: number;
  y: number;
  startTime: number;
  endTime: number;
  answers: Answer[];
  answered: boolean;
  answeredCorrectly: boolean;
  currentAnswer: string;
}

export interface Answer {
  answer: number;
  correct: boolean;
  timeTaken: number;
}
