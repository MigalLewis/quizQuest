import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  menuOptions: { option: string, url: string }[];

  constructor() {
    this.menuOptions = [
      { option: 'Profile', url: ''},
      { option: 'Settings', url: '' },
      { option: 'Help', url: ''},
      { option: 'About', url: ''}
    ];
  }
}
