import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-folder-options',
  templateUrl: './folder-options.component.html',
  styleUrls: ['./folder-options.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FolderOptionsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
