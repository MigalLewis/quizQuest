import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { CreateFolderComponent } from 'src/app/components/create-folder/create-folder.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { StorageService } from 'src/app/service/storage.service';
import { Folder } from 'src/app/model/folder.model';
import { FolderOptionsComponent } from 'src/app/components/folder-options/folder-options.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    CreateFolderComponent, 
    FolderComponent
  ]
})
export class HomePage implements OnInit {
  @ViewChild('modal')
   modal!: IonModal;
   folders: Folder[];

  constructor(
    private storageService: StorageService, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) {
    this.folders = [];
   }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading your folders ...'
    });
    loading.present();

    this.folders = await this.storageService.getFolders();
    this.loadingCtrl.dismiss();
  }

  async createFolder(foldername: string) {
    await this.storageService.addFolder({
      id: foldername.replace(' ', '_').toLowerCase(),
      name: foldername, 
      dateCreated: Date.now(),
      modifiedDate: Date.now()
    });
    this.folders = await this.storageService.getFolders();
    console.log(this.folders);
    
    await this.modal.dismiss();
  }

  async showOptions() {
    const modal = await this.modalCtrl.create({
      component: FolderOptionsComponent,
      initialBreakpoint: 0.15,
      cssClass: ['show-folder-actions']
    });
    modal.present();
  }

}
