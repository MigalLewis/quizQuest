import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Folder } from 'src/app/model/folder.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FolderComponent  implements OnInit {
  @Input({required: true}) folder: Folder | undefined;
  constructor() { }

  ngOnInit() {}

}
