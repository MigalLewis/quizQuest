import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/service/notification.service';
import { PhotoService } from 'src/app/service/photo.service';

@Component({
  selector: 'app-folder-options',
  templateUrl: './folder-options.component.html',
  styleUrls: ['./folder-options.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FolderOptionsComponent {
  @Input() folderId: string;

  constructor(
    private photoService: PhotoService,
    private router: Router,
    private modalController: ModalController,
    private notificationService: NotificationService) {
    this.folderId = ''
  }

  takePhoto() {
    this.photoService.takePhoto(this.folderId)
    .then(() => {
      this.modalController.dismiss(null, 'take_photo');
      this.notificationService.presentToast('top', 'Saved image to ' + this.folderId + ' successfully!')
    });
    

  }

  loadFolder() {
    this.router.navigate(['authenticated', 'view', 'folder', this.folderId]);
    this.modalController.dismiss(null, 'load_folder');
  }

  uploadPhotos() {
    this.photoService.uploadPhotos(this.folderId)
    .then(() => {
      this.modalController.dismiss(null, 'upload_photos');
      this.notificationService.presentToast('top', 'Saved image(s) to ' + this.folderId + ' successfully!')
    });
    
  }

}
