import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlatformIcon, TeamMember } from 'src/app/model/team-member.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule]
})
export class TeamCardComponent  implements OnInit {
  @Input() team: TeamMember[];
  constructor() {
    this.team = [];
   }

  ngOnInit() {}

}
