import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../game-server-types';

@Component({
  selector: 'app-game-result-view',
  templateUrl: './game-result-view.component.html',
  styleUrls: ['./game-result-view.component.css']
})
export class GameResultViewComponent implements OnInit {
  @Input() gameUid: string;

  players: Player[];
  activePlayerUid: string;
  maxRounds: number;
  nextRound: number;
  content: string;
  contentType: string; // "text" or "image"
  
  constructor(private game: GameService) { }

  private getContentType(content: string): string {
    if (this.content.startsWith("data:image/png;base64")) {
      return "image";
    } else {
      return "text";
    }
  }

  ngOnInit(): void {
    this.content = "";
    this.contentType = this.getContentType(this.content);
    this.nextRound = 1;
    this.game.fetchAllPlayers(this.gameUid).subscribe(results => {
      this.players = results;
      this.maxRounds = this.players.length;
    });
  }

  fetchContent(playerUid: string, round: number): void {
    this.activePlayerUid = playerUid;
    if (this.nextRound > this.maxRounds) round = 1;
    this.game.retrieveContent(this.gameUid, playerUid, round).subscribe(res => {
      this.content = res.content; 
      this.contentType = this.getContentType(this.content);
      this.nextRound = round + 1;
    });
  }

  resetGame(): void {
    this.game.resetGame(this.gameUid).subscribe();
  }
}
