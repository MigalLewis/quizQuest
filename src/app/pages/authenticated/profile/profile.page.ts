import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {BackgroundComponent} from '../../../components/background/background.component';
import {UserDetailsComponent} from '../../../components/user-details/user-details.component';
import {FirestoreService, UserDetail} from '../../../service/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent, UserDetailsComponent]
})
export class ProfilePage {

  constructor(private firestoreService: FirestoreService) {
  }

  updateProfile(user: UserDetail) {
    this.firestoreService.saveUser(user);
  }
}
