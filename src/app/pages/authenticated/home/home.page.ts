import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/service/storage.service';
import { Folder } from 'src/app/model/folder.model';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
  ]
})
export class HomePage implements OnInit {

  constructor(
    private storageService: StorageService, 
    private loadingCtrl: LoadingController) {
   }

  async ngOnInit() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Loading your folders ...'
    });
    loading.present();

    this.loadingCtrl.dismiss();
  }

}
