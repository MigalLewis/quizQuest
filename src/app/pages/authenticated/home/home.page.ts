import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/components/background/background.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    BackgroundComponent
  ]
})
export class HomePage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router) {

   }

  async ngOnInit() {

    
    // const loading = await this.loadingCtrl.create({
    //   message: 'Loading your folders ...'
    // });
    // loading.present();

    // this.loadingCtrl.dismiss();
  }

  enterGame() {
    this.router.navigate(['authenticated','pre', 'game'])
  }

}
