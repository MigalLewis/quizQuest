import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router)

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

  }

  emailAndPasswordRegistration(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUser.subscribe(user => {
          if (user) {
            this.router.navigate(['register'])
          } 
        });
      })
  }

  private get currentUser() {
    return user(this.auth);
  }

}
