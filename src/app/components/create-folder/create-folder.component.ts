import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateFolderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
