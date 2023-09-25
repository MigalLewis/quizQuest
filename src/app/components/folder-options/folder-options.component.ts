import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {}

  takePhoto() {
    this.photoService.takePhoto();
    
  }

}
