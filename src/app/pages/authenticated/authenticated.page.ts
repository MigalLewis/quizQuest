import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FirestoreService, UserDetail } from 'src/app/service/firestore.service';
import { AuthService } from 'src/app/service/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.page.html',
  styleUrls: ['./authenticated.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule]
})
export class AuthenticatedPage implements OnInit {
  user!: UserDetail | any;

  menuOptions: { option: string, url: string }[];

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService) {
    this.menuOptions = [
      { option: 'Profile', url: 'profile'},
      { option: 'Settings', url: '' },
      { option: 'Help', url: 'help'},
      { option: 'About', url: 'about'},
    ];
  }

  ngOnInit(): void {
    this.authService.currentUser$
    .pipe(switchMap(
      currentUser => this.firestoreService.userInfo(currentUser!.uid)))
    .subscribe(user => this.user = user);
  }

}
