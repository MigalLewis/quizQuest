import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateFolderComponent } from 'src/app/components/create-folder/create-folder.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    CreateFolderComponent, 
    FolderComponent
  ]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
