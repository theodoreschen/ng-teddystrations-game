import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { gameServerUrl } from './game-server-data';
import { GameState, Player, Timer, Content } from './game-server-types';
import { LoggerService } from './logger.service';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService{
  private jsonHttpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private CorsHttpOptions = {
    headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
  };

  constructor(
    private http: HttpClient,
    private log: LoggerService
  ) { }

  fetchGameState(): Observable<GameState> {
    // return of(<GameState>{state: "ready", message: null});
    return this.http.get<GameState>(`${gameServerUrl}/game-state`)
      .pipe(
        tap(result => this.log.DEBUG("GameService.fetchGameState", `Retrieved ${JSON.stringify(result)}`)),
        catchError(this.handleError<any>("GameService.fetchGameState"))
      );
  }

  fetchAllPlayers(uid: string): Observable<Player[]> {
    let args = {uid: uid};
    return this.http.get<Player[]>(`${gameServerUrl}/game/players`, {params: args})
      .pipe(
        // tap(result => this.log.DEBUG("GameService.fetchAllPlayers", `Retrieved ${JSON.stringify(result)}`)),
        catchError(this.handleError<any>("GameService.fetchAllPlayers"))
      );
  }

  authenticateGame(uid: string): Observable<any> {
    let args = {uid: uid};
    return this.http.put(`${gameServerUrl}/game/authenticate`, '', {params: args})
      .pipe(
        // tap(_ => this.log.DEBUG("GameService.authenticateGame", "Successfully authenticated!")),
        catchError(this.handleError<any>("GameService.authenticateGame"))
      );
    }

  resetGame(uid: string): Observable<any> {
    let args = {uid: uid};
    return this.http.delete(`${gameServerUrl}/game`, {params: args})
      .pipe(
        // tap(_ => this.log.DEBUG("GameService.resetGame", "Successfully reset game")),
        catchError(this.handleError<any>("GameService.resetGame"))
      );
  }

  startGame(uid: string, nplayers: number): Observable<any> {
    let args = {uid: uid, nplayers: `${nplayers}`};
    return this.http.put(`${gameServerUrl}/game/start`, '', {params: args})
      .pipe(
        // tap(_ => this.log.DEBUG("GameService.startGame", "Successfully started game")),
        catchError(this.handleError<any>("GameService.startGame"))
      );
  }

  getTimeRemaining(uid: string): Observable<Timer> {
    let args = {uid: uid};
    return this.http.get<Timer>(`${gameServerUrl}/game/current-round/time-remaining`, {params: args})
      .pipe(
        // tap(result => this.log.DEBUG("GameService.getTimeRemaining", `${JSON.stringify(result)}`)),
        catchError(this.handleError<any>("GameService.getTimeRemaining"))
      );
  }

  nextRound(uid: string): Observable<any> {
    let args = {uid: uid};
    return this.http.put(`${gameServerUrl}/game/next-round`, '', {params: args})
      .pipe(
        // tap(_ => this.log.DEBUG("GameService.nextRound", "Advancing to next round")),
        catchError(this.handleError<any>("GameService.nextRound"))
      );
  }

  endRound(uid: string): Observable<any> {
    let args = {uid: uid};
    return this.http.put(`${gameServerUrl}/game/end-round`, '', {params: args})
      .pipe(
        // tap(_ => this.log.DEBUG("GameService.endRound", "Ending current round")),
        catchError(this.handleError<any>("GameService.endRound"))
      );
  }

  retrieveContent(uid: string, playerUid: string, round: number): Observable<Content> {
    let args = {uid: uid};
    return this.http.get<Content>(`${gameServerUrl}/game/${playerUid}/${round}/`, {params: args})
      .pipe(
        // tap(result => this.log.DEBUG(
        //   "GameService.retrieveContent",
        //   `Content for round ${result.round} received from player ${result.originPlayer}`
        // )),
        catchError(this.handleError<any>("GameService.retrieveContent"))
      );
  }

  getListPlayersSubmitted(uid: string): Observable<Player[]> {
    let args = {uid: uid};
    return this.http.get<Player[]>(`${gameServerUrl}/game/players-submitted`, {params: args})
      .pipe(
        tap(result => this.log.DEBUG(
          "GameService.getListPlayersSubmitted",
          `${result.length} submissions made`
        )),
        catchError(this.handleError<any>("GameService.getListPlayersSubmitted"))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log.ERROR(operation, `Failed with error '${error.message}'`);
      return of(result as T);
    };
  }
}
