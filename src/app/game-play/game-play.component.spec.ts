import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayComponent } from './game-play.component';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';

describe('GamePlayComponent', () => {
  let mockLog, mockGame;
  let component: GamePlayComponent;
  let fixture: ComponentFixture<GamePlayComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpy();
    mockGame = jasmine.createSpy();

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
