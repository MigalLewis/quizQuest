import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hacked',
  templateUrl: './hacked.page.html',
  styleUrls: ['./hacked.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    RouterModule
  ]
})
export class HackedPage implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }

}
