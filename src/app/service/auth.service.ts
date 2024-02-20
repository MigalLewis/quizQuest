import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user, User, AuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {BehaviorSubject, of, Subject, switchMap, take} from 'rxjs';
import { NotificationService } from './notification.service';
import {FirestoreService, UserDetail} from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(NotificationService)
  private userSubject$ = new BehaviorSubject<UserDetail>({});
  private firestoreService = inject(FirestoreService)

  constructor() {
    this.currentUser$.subscribe(currentUser => {
      this.setUserSubject(currentUser);
    })
  }

  googleAuth() {
    this.handleGoogleOrFacebookAuth(new GoogleAuthProvider);
  }

  facebookAuth() {
      this.handleGoogleOrFacebookAuth(new FacebookAuthProvider);
  }

  emailAndPasswordAuth(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUser$.pipe(take(1)).subscribe(user => {
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
        this.currentUser$.subscribe(user => {
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

  get currentUser$() {
    return user(this.auth);
  }

  get currentUser() {
    return this.userSubject$.getValue();
  }

  private setUserSubject(user: User | null) {
    if (user) {
      const name = user.displayName?.split(' ')[0];
      const surname = user.displayName?.split(' ')[1];
      this.userSubject$.next({
        uid: user.uid,
        name,
        surname
      });
    }
  }

  private handleGoogleOrFacebookAuth(provider: AuthProvider) {
    signInWithPopup(this.auth, provider)
      .then(() => {
        this.currentUser$.pipe(
          switchMap(user => {
            if (!user) return of(null);
            this.setUserSubject(user);
            return this.firestoreService.userInfo(user?.uid!);
          }),
          take(1)).subscribe(savedUser => {
          if (savedUser) {
            this.router.navigate(['authenticated', 'home']);
          } else {
            this.firestoreService.saveUser(this.currentUser, this.currentUser.uid!);
            this.router.navigate(['register']);
          }
        });
      });

  }
}
