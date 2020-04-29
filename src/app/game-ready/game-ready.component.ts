import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { Player } from '../game-server-types';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-ready',
  templateUrl: './game-ready.component.html',
  styleUrls: ['./game-ready.component.css']
})
export class GameReadyComponent implements OnInit, OnDestroy {
  playerPoller: any;
  doPlayerPolling: boolean;
  players: Player[];
  pollCounter: number;

  @Input() develMode: boolean;
  @Input() gameUid: string;

  constructor(
    private log: LoggerService,
    private game: GameService
  ) { }

  ngOnInit(): void {
    this.develMode = false;
    this.players = [];
    this.doPlayerPolling = true;
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    this.playerPoller = interval(2000).subscribe(count => {
      this.game.fetchAllPlayers(this.gameUid).subscribe(players => this.players = players);
      this.pollCounter = count + 1;
    });
  }

  stopPolling(): void {
    this.playerPoller.unsubscribe();
  }

  togglePlayerPolling(): void {
    // for debugging only
    if (this.doPlayerPolling) this.stopPolling();
    else this.startPolling();
    this.doPlayerPolling = !this.doPlayerPolling;
  }

}
