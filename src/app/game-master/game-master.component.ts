import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameStateService } from '../game-state.service';
import { GameState } from '../game-server-types';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.css']
})
export class GameMasterComponent implements OnInit, OnDestroy {
  statePoller: any;
  state: GameState;
  develMode: boolean;
  doStatePolling: boolean;
  pollCounter: number;

  constructor(
    private log: LoggerService,
    private gameState: GameStateService
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
      this.gameState.fetchGameState().subscribe(state => this.state = state);
      this.pollCounter = count + 1;
    });
  }

  stopPolling(): void {
    this.statePoller.unsubscribe();
  }

  toggleStatePolling(): void {
    if (this.doStatePolling) {
      this.stopPolling();
    } else {
      this.startPolling();
    }
    this.doStatePolling = !this.doStatePolling;
  }

}