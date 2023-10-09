import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PhotoService } from 'src/app/service/photo.service';

@Component({
  selector: 'app-folder-options',
  templateUrl: './folder-options.component.html',
  styleUrls: ['./folder-options.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FolderOptionsComponent  implements OnInit {
  @Input() folderId: string;

  constructor(private photoService: PhotoService) {
    this.folderId = ''
  }

  ngOnInit() {
    this.photoService.loadSaved()
      .then(() => console.log(this.photoService.photos)
      )
  }

  takePhoto() {
    this.photoService.takePhoto(this.folderId);
  }

}
