import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/components/background/background.component';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent]
})
export class SplashPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
