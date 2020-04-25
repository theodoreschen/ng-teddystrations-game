import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gameServerUrl } from './game-server-url';
import { GameState } from './game-server-types';
import { LoggerService } from './logger.service';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameStateService implements OnInit, OnDestroy {
  gameState: GameState;
  statePoller: any;

  constructor(
    private http: HttpClient,
    private log: LoggerService
  ) { }

  ngOnInit(): void {
    this.statePoller = setInterval(this.fetchGameState, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.statePoller);
  }

  fetchGameState(): void {
    this.log.DEBUG("GameStateService.fetchGameState", "fetching game state");
    this.http.get<GameState>(`${gameServerUrl}/game-state`)
      .pipe(
        tap(result => this.log.DEBUG("GameStateService.fetchGameState", `Retrieving ${JSON.stringify(result)}`)),
        catchError(this.handleError<any>("GameStateService.fetchGameState"))
      )
      .subscribe(result => this.gameState = result);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log.ERROR(operation, `Failed with error '${error.message}'`);
      return of(result as T);
    };
  }
}
