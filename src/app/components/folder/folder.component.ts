import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FolderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
