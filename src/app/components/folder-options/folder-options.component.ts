import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
    private router: Router) {
    this.folderId = ''
  }

  takePhoto() {
    this.photoService.takePhoto(this.folderId);
  }

  loadFolder() {
    this.router.navigate(['authenticated', 'view', 'folder', this.folderId])
  }

}
