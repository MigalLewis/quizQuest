import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  team: TeamMember[];
  constructor() {
    this.team = [
      {
        name: 'Jose Trocado',
        imageUrl: '../../../../assets/images/jose.jpeg',
        role:'Developer',
        socialMediaPlatforms: [
          { icon: PlatformIcon.LINKEDIN, url: 'http://linkedin.com/in/jose-trocado-aa6053190' },
          { icon: PlatformIcon.GITHUB, url: 'https://github.com/Josetrocado'}
        ]
      },
      {
        name: 'Tanaka Madondo',
        imageUrl: '../../../../assets/images/tanaka.jpeg',
        role: 'Developer',
        socialMediaPlatforms: [
          { icon: PlatformIcon.LINKEDIN, url: 'https://www.linkedin.com/in/tk-madondo'},
          { icon: PlatformIcon.GITHUB, url: 'https://github.com/tanaka-kenny'},
          { icon: PlatformIcon.PERSONAL_WEBSITE, url: 'https://tanakadev.com/about'}
        ]
      },
      {
        name: 'Duduetso Morupane',
        imageUrl: '../../../../assets/images/dudu.jpeg',
        role: 'Business Analyst',
        socialMediaPlatforms: [
          {icon: PlatformIcon.LINKEDIN, url: 'https://www.linkedin.com/in/duduetso-morupane-6a3548211'}
        ]
      },
      {
        name: 'Migal Lewis',
        imageUrl: '../../../../assets/images/migal.jpeg',
        role: 'Designer/ Tech Lead',
        socialMediaPlatforms: [
          { icon: PlatformIcon.LINKEDIN, url: 'www.linkedin.com/in/migal-lewis-216244b2'},
          { icon: PlatformIcon.GITHUB, url: 'https://github.com/MigalLewis'}
        ]
      }
    ];
   }

  ngOnInit() {}

}
