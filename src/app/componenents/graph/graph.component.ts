import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RankedPlayer } from 'src/app/model/ranked-player.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GraphComponent  implements OnInit {

  @Input()
  players: RankedPlayer[] = [];

  constructor() { }

  ngOnInit() {}

  switchedPlayerIndexes() {
     [this.players[0], this.players[1]] = [this.players[1], this.players[0]];
     return this.players;
  }
  
  playerPosition(position: number) {
    switch (position) {
      case 1:
        return '1st';
      case 2:
        return '2nd'
      case 3:
        return '3rd'
      default:
        return;
    }
  }

  getBarHeight(index: number) {
    switch(index) {
      case 0:
        return '5rem';
      case 1:
        return '10rem';
        case 2:
        return '7.5rem';
      default:
        return;
    }
  }

}
