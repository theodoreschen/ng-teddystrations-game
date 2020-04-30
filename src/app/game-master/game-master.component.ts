import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { GameState } from '../game-server-types';
import { interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.css']
})
export class GameMasterComponent implements OnInit, OnDestroy {
  @Input() develMode: boolean;
  statePoller: any;
  state: GameState;
  doStatePolling: boolean;
  pollCounter: number;
  gameUid: string;

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieService 
  ) { }

  ngOnInit(): void {
    this.develMode = false;
    this.doStatePolling = true;
    this.startPolling();

    this.gameUid = this.cookie.get('tedstrations-uid');
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    this.statePoller = interval(2000).subscribe(count => {
      this.game.fetchGameState().subscribe(state => {
        this.state = state;
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

  resetGame(): void {
    this.game.resetGame(this.gameUid).subscribe();
  }

  gameUidHandler(event): void {
    this.gameUid = event;
    this.cookie.set('tedstrations-uid', event, 1);
  }

}