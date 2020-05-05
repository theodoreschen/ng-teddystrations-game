import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { interval } from 'rxjs';
import { take, finalize, tap } from 'rxjs/operators';
import { GameState } from '../game-server-types';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, OnDestroy {
  gpc = this;

  @Input() gameUid: string;
  @Input() develMode: string;
  @Input() state: GameState;

  pbMax: number;
  pbValue: number;
  currentRound: number;
  totalRounds: number;

  countdownTimer: any;

  constructor(
    private log: LoggerService,
    private game: GameService
  ) { }

  ngOnInit(): void {
    console.log(this.log);
    this.pbMax = 100;
    this.pbValue = 0;

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.endTimer();
  }

  private startTimer(): void {
    this.game.getTimeRemaining(this.gameUid).subscribe(t => {
      this.pbMax = t.roundDuration;
      this.pbValue = this.pbMax - t.timeRemaining;
      this.currentRound = t.round; 
      this.totalRounds = t.totalRounds;

      this.countdownTimer = interval(1000)
        .pipe(
          take(t.timeRemaining)
        )
        .subscribe(_ => {
          this.pbValue += 1;
        });
    });
  }

  private endTimer(): void {
    this.countdownTimer.unsubscribe();
  }

  onTimerExpiration(): void {
    this.log.DEBUG("GamePlayComponent.onTimerExpiration", "");
    this.endRound();
  }

  endRound(): void {
    this.log.DEBUG("GamePlayComponent.endRound", "");
  }

  beginNextRound(): void {

  }

}
