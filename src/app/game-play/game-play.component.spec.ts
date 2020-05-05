import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayComponent } from './game-play.component';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { of } from 'rxjs';
import { Timer, GameState } from '../game-server-types';

describe('GamePlayComponent', () => {
  let mockLog, mockGame;
  let component: GamePlayComponent;
  let fixture: ComponentFixture<GamePlayComponent>;
  let mockTimerObj: Timer = {
    round: 1,
    totalRounds: 1,
    roundDuration: 120,
    timeRemaining: 0
  };

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG"]);
    mockGame = jasmine.createSpyObj(["getTimeRemaining", "endRound"]);
    mockGame.getTimeRemaining.and.returnValue(of(mockTimerObj));
    mockGame.endRound.and.returnValue(of({}));

    TestBed.configureTestingModule({
      declarations: [ GamePlayComponent ],
      providers: [
        {provide: LoggerService, useValue: mockLog},
        {provide: GameService, useValue: mockGame}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayComponent);
    component = fixture.componentInstance;
    component.state = <GameState>{state: "ROUND_ACTIVE", message: "1"};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
