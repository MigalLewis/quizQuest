import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GraphComponent } from 'src/app/componenents/graph/graph.component';
import { RankedPlayer } from 'src/app/model/ranked-player.model';

@Component({
  selector: 'app-completed-game',
  templateUrl: './completed-game.page.html',
  styleUrls: ['./completed-game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GraphComponent]
})
export class CompletedGamePage implements OnInit {
  // TODO: Should come from some kind of a service
  players: RankedPlayer[] = [
    { position: 1, name: 'Migal Lewis', points: 32, completionTime: '4.20min',},
    { position: 2, name: 'Tanaka Madondo', points: 24, completionTime: '3.20min',},
    { position: 3, name: 'Pam Govender', points: 24, completionTime: '4.05min',},
    { position: 4, name: 'Karabo Hlatswayo', points: 21, completionTime: '3.60min',},
    { position: 5, name: 'Carl Heinz', points: 21, completionTime: '4.20min',},
    { position: 6, name: 'Princes Mbeki', points: 12, completionTime: '3.10min',}
  ];

  constructor() { 
  }

  ngOnInit() {
   
  }

}
