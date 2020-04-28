import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMasterComponent } from './game-master.component';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { CookieService } from 'ngx-cookie-service';

describe('GameMasterComponent', () => {
  let mockLog, mockGameStateService, mockCookie;
  let component: GameMasterComponent;
  let fixture: ComponentFixture<GameMasterComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG"]);
    mockGameStateService = jasmine.createSpyObj(["fetchGameState"]);
    mockCookie = jasmine.createSpyObj(["get", "set"]);

    TestBed.configureTestingModule({
      declarations: [ GameMasterComponent ],
      providers: [
        { provide: LoggerService, useValue: mockLog },
        { provide: GameService, useValue: mockGameStateService },
        { provide: CookieService, useValue: mockCookie }
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
