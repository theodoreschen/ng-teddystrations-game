import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { GameState } from '../game-server-types';
import { interval } from 'rxjs';
import { CookieManagerService } from '../cookie-manager.service';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.css']
})
export class GameMasterComponent implements OnInit, OnDestroy {
  develMode: boolean;
  statePoller: any;
  state: GameState;
  doStatePolling: boolean;
  pollCounter: number;
  gameUid: string;

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieManagerService
  ) { }

  ngOnInit(): void {
    this.develMode = this.log.develMode;
    this.doStatePolling = true;
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    this.statePoller = interval(2000).subscribe(count => {
      this.game.fetchGameState().subscribe(state => {
        this.state = state;
        this.cookie.updateGameState(this.state);
      });
      this.pollCounter = count + 1;
    });
  }

  stopPolling(): void {
    this.statePoller.unsubscribe();
  }

  toggleStatePolling(): void {
    // for debugging only
    if (this.doStatePolling) this.stopPolling();
    else this.startPolling();
    this.doStatePolling = !this.doStatePolling;
  }

  gameUidHandler(event): void {
    this.gameUid = event;
    this.cookie.gameUid = this.gameUid;
  }

}