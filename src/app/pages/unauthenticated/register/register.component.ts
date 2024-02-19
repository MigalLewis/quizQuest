import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackgroundComponent } from '../../../components/background/background.component';
import { FirestoreService, UserDetail } from 'src/app/service/firestore.service';
import {UserDetailsComponent} from '../../../components/user-details/user-details.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, RouterModule, BackgroundComponent, UserDetailsComponent]
})
export class RegisterComponent {
  constructor(
    private firestoreService: FirestoreService) {
  }

  async saveUser(user: UserDetail) {
    this.firestoreService.saveUser(user);
  }
}
