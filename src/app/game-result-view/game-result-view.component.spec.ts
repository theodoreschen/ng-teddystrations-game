import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultViewComponent } from './game-result-view.component';
import { GameService } from '../game.service';
import { of } from 'rxjs';

describe('GameResultViewComponent', () => {
  let mockGame;
  let component: GameResultViewComponent;
  let fixture: ComponentFixture<GameResultViewComponent>;

  beforeEach(async(() => {
    mockGame = jasmine.createSpyObj(["fetchAllPlayers", "fetchContent"])
    
    TestBed.configureTestingModule({
      declarations: [ GameResultViewComponent ],
      providers: [
        { provide: GameService, useValue: mockGame }
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultViewComponent);
    component = fixture.componentInstance;
    component.gameUid = "01234567-0123-4567-89ab-0123456789ab";
    mockGame.fetchAllPlayers.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
