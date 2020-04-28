import { Injectable } from '@angular/core';
import { GameState } from './game-server-types';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {
  gameUid: string;
  gameState: GameState;

  constructor() { }

  updateGameState(state: GameState): void {
    if (this.gameState != state) this.gameState = state;
  }
}
