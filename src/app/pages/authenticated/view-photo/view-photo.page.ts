import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomPhoto } from 'src/app/model/photo.model';
import { PhotoService } from 'src/app/service/photo.service';

@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.page.html',
  styleUrls: ['./view-photo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewPhotoPage implements OnInit {
  @Input() photoId = '';
  @Input('id') folderId = '';
  photo: CustomPhoto | undefined;

  private photoService = inject(PhotoService);

  ngOnInit() {
    this.photoService.loadPhoto(this.folderId, this.photoId)
      .then(photo => this.photo = photo)
  }

}
