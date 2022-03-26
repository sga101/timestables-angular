import { filter, map, pairwise, take } from 'rxjs';
import { CalculationsService } from './calculations.service';
import { GameService } from './game.service';
import { HistoryService } from './history.service';
import { QuestionService } from './question.service';
import { RandomNumbersService } from './random-numbers.service';
import { ResultsService } from './results.service';
import { TableSelectionService } from './table-selection.service';
import { TimerService } from './timer.service';

describe('GameService', () => {
  let service: GameService;
  let questionService: QuestionService;
  let resultsService: ResultsService;
  let historyService: HistoryService;

  beforeEach(() => {
    historyService = new HistoryService();
    questionService = new QuestionService(new TimerService(), new RandomNumbersService(), new TableSelectionService());
    resultsService = new ResultsService(new CalculationsService(), historyService);
    service = new GameService(questionService, resultsService, historyService);
    service.questionDelay = 0;
  });

  it('should start in setup mode', (done) => {
    service.gameStatus$.subscribe((status) => {
      expect(status).toEqual('Setup');
      done();
    });
  });

  it('should set status = playing after reset', (done) => {
    service.reset(1);
    service.gameStatus$.subscribe((status) => {
      expect(status).toEqual('Playing');
      done();
    });
  });

  it('should end game after last question is answered correctly', (done) => {
    // automatically answer all the question
    questionService.questions$
      .pipe(
        filter((question) => question && !question.answered),
        map((question) => questionService.answerQuestion(question.x * question.y))
      )
      .subscribe();

    // monitor the game status
    service.gameStatus$
      .pipe(
        filter((gameStatus) => gameStatus === 'Finished'),
        map(() => done())
      )
      .subscribe();

    // start a game with 2 questions
    service.reset(2);
  });

  it('should change multichoice mode when requested', (done) => {
    service.isMultiChoice$
      .pipe(
        pairwise(),
        map(([first, second]) => {
          try {
            expect(first).toBeTruthy();
            expect(second).toBeFalsy();
            done();
          } catch (error) {
            done(error);
          }
        })
      )
      .subscribe();
    service.setMultiChoiceMode(true);
    service.setMultiChoiceMode(false);
  });

  it('should revert to setup when changeSettings is called', (done) => {
    service.gameStatus$
      .pipe(
        pairwise(),
        filter(([first, second]) => first === 'Playing' && second === 'Setup'),
        take(1),
        map(() => {
          done();
        })
      )
      .subscribe();
    service.reset(1);
    service.changeSettings();
  });
});
