import { Injectable, OnDestroy } from '@angular/core';
import { GameState } from './game-server-types';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService implements OnDestroy{
  // TODO: implement cookies to write state to disk

  gameUid: string;
  gameState: GameState;

  constructor(private log: LoggerService) { }

  ngOnDestroy(): void {
    this.log.DEBUG("CookieManagerService.ngOnDestroy", "Saving state with cookie");
  }

  updateGameState(state: GameState): void {
    if (this.gameState != state) this.gameState = state;
  }
}
