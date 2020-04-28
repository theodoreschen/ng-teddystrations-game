import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { FormsModule } from '@angular/forms';

describe('AuthenticateComponent', () => {
  let mockLog, mockGame;
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG"]);
    mockGame = jasmine.createSpyObj(["fetchAllPlayers"]);
    
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AuthenticateComponent ],
      providers: [
        { provide: LoggerService, useValue: mockLog },
        { provide: GameService, useValue: mockGame }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
