import { Component, OnInit, Output } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  @Output() gameUidEmitter = new EventEmitter();
  gameUid: string;
  develMode: boolean;

  constructor(
    private log: LoggerService,
    private game: GameService,
  ) { }

  ngOnInit(): void {
    this.develMode = this.log.develMode;
  }

  onSubmit(): void {
    this.log.DEBUG("AuthenticateComponent.onSubmit", `Authenticating with UID: ${this.gameUid}`);
    this.game.authenticateGame(this.gameUid).subscribe();
    this.gameUidEmitter.emit(this.gameUid);
  }

}
