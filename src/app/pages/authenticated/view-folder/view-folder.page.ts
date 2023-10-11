import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PhotoService } from 'src/app/service/photo.service';
import { CustomPhoto } from 'src/app/model/photo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.page.html',
  styleUrls: ['./view-folder.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewFolderPage implements OnInit {
  @Input('id') folderId = '';
  photos: CustomPhoto[] = [];

  private photoService = inject(PhotoService);
  private router = inject(Router);

  constructor() {
    
  }

  ngOnInit() {
    this.photoService.loadSaved(this.folderId)
    .then(savedPhotos => this.photos = savedPhotos
    );
  }

  openPhoto(id: string) {
    this.router.navigate(['authenticated', 'view', 'folder', this.folderId, id])
  }

}
