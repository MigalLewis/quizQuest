import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guided-videos',
  templateUrl: './guided-videos.page.html',
  styleUrls: ['./guided-videos.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterModule]
})
export class GuidedVideosPage implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
  }

}
