import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-data-privacy',
  templateUrl: './data-privacy.page.html',
  styleUrls: ['./data-privacy.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterModule
  ]
})
export class DataPrivacyPage implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
  }

}
