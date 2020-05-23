import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { GameState } from '../game-server-types';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, OnDestroy {
  @Input() gameUid: string;
  @Input() develMode: string;
  @Input() state: GameState;

  pbMax: number;
  pbValue: number;
  currentRound: number;
  totalRounds: number;

  countdownTimer: any;
  endOfCountdownTimer: any;

  constructor(
    private log: LoggerService,
    private game: GameService
  ) { }

  ngOnInit(): void {
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
        .pipe(take(t.timeRemaining))
        .subscribe(_ => this.pbValue += 1);
      
      // I couldn't think of a clever RxJS way of doing something
      // after all the takes are completed in countdown timer,
      // so I just initialized another Observable
      this.endOfCountdownTimer = timer(t.timeRemaining * 1000)
        .pipe(take(1))
        .subscribe(_ => this.endRound());
    });
  }

  private endTimer(): void {
    this.countdownTimer.unsubscribe();
    this.endOfCountdownTimer.unsubscribe();
  }

  endRound(): void {
    this.log.DEBUG("GamePlayComponent.endRound", "");
    this.game.endRound(this.gameUid).subscribe(_ => {
      this.game.getTimeRemaining(this.gameUid).subscribe(t => {
        this.pbValue = this.pbMax;
        this.endTimer();
      })
    });
  }

  beginNextRound(): void {
    this.log.DEBUG("GamePlayComponent.beginNextRound", "");
    this.game.nextRound(this.gameUid).subscribe(_ => this.startTimer());
  }

  viewResults(): void {
    this.log.DEBUG("GamePlayComponent.viewResults", "");
    this.game.nextRound(this.gameUid).subscribe();
  }

}
