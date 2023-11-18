import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUser.pipe(take(1)).subscribe(user => {
          if (user)
            this.router.navigate(['authenticated', 'home']);
        })
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
      })
  }

  get currentUser() {
    return user(this.auth);
  }

}
