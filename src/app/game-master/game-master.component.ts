import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.css']
})
export class GameMasterComponent implements OnInit {

  constructor(
    private log: LoggerService,
    private gameState: GameStateService
  ) { }

  ngOnInit(): void {
  }

}
