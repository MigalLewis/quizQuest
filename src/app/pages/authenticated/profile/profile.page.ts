import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {BackgroundComponent} from '../../../components/background/background.component';
import {UserDetailsComponent} from '../../../components/user-details/user-details.component';
import {FirestoreService} from '../../../service/firestore.service';
import {AuthService} from '../../../service/auth.service';
import {map, Observable, switchMap} from "rxjs";
import {Router} from "@angular/router";
import { UserDetail } from 'src/app/model/user-detail.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent, UserDetailsComponent]
})
export class ProfilePage implements OnInit{
  user!: Observable<UserDetail>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.authService.savedUserObservable$;
  }

  updateProfile(user: UserDetail) {
    this.firestoreService.saveUser(user)
      .then(() => this.router.navigate(['authenticated', 'home']));
  }
}
