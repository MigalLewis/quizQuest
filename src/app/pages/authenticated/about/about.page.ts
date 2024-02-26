import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TeamCardComponent } from 'src/app/components/team-card/team-card.component';
import { PlatformIcon, TeamMember } from 'src/app/model/team-member.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    TeamCardComponent
  ]
})
export class AboutPage implements OnInit {

  team: TeamMember[];

  constructor() { 
    this.team =  [];
  }

  ngOnInit() {
    this.team = this.getTeam();
  }

  getTeam() {
    return [
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

}
