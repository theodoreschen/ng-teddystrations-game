import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  @Output() gameUidEmitter = new EventEmitter<string>();
  gameUid: string;
  @Input() develMode: boolean;

  constructor(
    private log: LoggerService,
    private game: GameService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.log.DEBUG("AuthenticateComponent.onSubmit", `Authenticating with UID: ${this.gameUid}`);
    this.game.authenticateGame(this.gameUid).subscribe(_ => this.gameUidEmitter.emit(this.gameUid))
  }

}
