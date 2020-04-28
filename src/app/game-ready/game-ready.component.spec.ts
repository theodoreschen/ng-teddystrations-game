import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReadyComponent } from './game-ready.component';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';

describe('GameReadyComponent', () => {
  let mockLog, mockGame;
  let component: GameReadyComponent;
  let fixture: ComponentFixture<GameReadyComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG"]);
    mockGame = jasmine.createSpyObj(["fetchAllPlayers"]);
    TestBed.configureTestingModule({
      declarations: [ GameReadyComponent ],
      providers: [
        { provide: LoggerService, useValue: mockLog },
        { provide: GameService, useValue: mockGame }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
