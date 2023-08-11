import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.page.html',
  styleUrls: ['./authenticated.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class AuthenticatedPage implements OnInit {

  menuOptions: { option: string, url: string }[];

  constructor() {
    this.menuOptions = [
      { option: 'Profile', url: ''},
      { option: 'Settings', url: '' },
      { option: 'Help', url: ''},
      { option: 'About', url: 'about'}
    ];
  }

  ngOnInit(): void {
      
  }

}
