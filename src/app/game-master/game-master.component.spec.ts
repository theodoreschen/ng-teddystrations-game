import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMasterComponent } from './game-master.component';
import { LoggerService } from '../logger.service';
import { GameStateService } from '../game-state.service';

describe('GameMasterComponent', () => {
  let mockLog, mockGameStateService;
  let component: GameMasterComponent;
  let fixture: ComponentFixture<GameMasterComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG"]);
    mockGameStateService = jasmine.createSpyObj(["fetchGameState"]);

    TestBed.configureTestingModule({
      declarations: [ GameMasterComponent ],
      providers: [
        { provide: LoggerService, useValue: mockLog },
        { provide: GameStateService, useValue: mockGameStateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
