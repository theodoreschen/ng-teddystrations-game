import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {
  @Input() gameUid: string;
  @Input() develMode: string;

  constructor() { }

  ngOnInit(): void {
  }

}
