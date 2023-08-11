import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TeamCardComponent } from 'src/app/components/team-card/team-card.component';

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

  constructor() { 
    
  }

  ngOnInit() {
  }

}
