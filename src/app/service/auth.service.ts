import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(NotificationService)

  googleAuth() {
    signInWithPopup(this.auth, new GoogleAuthProvider)
      .then(() => {
        this.currentUser.subscribe(user => {
          if (user) {
            this.router.navigate(['register'])
          }
        });
      });
  }

  facebookAuth() {
    signInWithPopup(this.auth, new FacebookAuthProvider)
      .then(() => {
        this.currentUser.subscribe(user => {
          if (user) {
            this.router.navigate(['register'])
          }
        });
      });
  }

  emailAndPasswordAuth(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUser.pipe(take(1)).subscribe(user => {
          if (user)
            this.router.navigate(['authenticated', 'home']);
        })
      }).catch(() => {
        this.alertService.presentToast(
          'middle', 
          'Please enter valid login details!',
          'toast-class-error');
      })
  }

  emailAndPasswordRegistration(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUser.subscribe(user => {
          if (user) {
            this.router.navigate(['register'])
          } 
        });
      }).catch(error => {
        if ( error.code === 'auth/email-already-in-use') {
          this.alertService.presentToast(
            'middle', 
            'The email you provided is already in use!',
            'toast-class-error');
        } else if ( error.code === 'auth/weak-password') {
          this.alertService.presentToast(
            'middle', 
            'Please enter a password with at least 6 characters!',
            'toast-class-error');
        }
      })
  }

  get currentUser() {
    return user(this.auth);
  }

}
