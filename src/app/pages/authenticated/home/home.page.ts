import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { CreateFolderComponent } from 'src/app/components/create-folder/create-folder.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { StorageService } from 'src/app/service/storage.service';

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

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  async createFolder(foldername: string) {
    this.storageService.createFolder(foldername);
    await this.modal.dismiss();
  }

}
