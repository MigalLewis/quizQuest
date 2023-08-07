import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-folder-actions',
  templateUrl: './folder-actions.component.html',
  styleUrls: ['./folder-actions.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FolderActionsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
