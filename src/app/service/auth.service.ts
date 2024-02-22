import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user, User, AuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {BehaviorSubject, map, of, Subject, switchMap, take} from 'rxjs';
import { NotificationService } from './notification.service';
import {FirestoreService, UserDetail} from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(NotificationService)
  private currentUser?: UserDetail;
  private firestoreService = inject(FirestoreService)

  googleAuth() {
    this.handleGoogleOrFacebookAuth(new GoogleAuthProvider);
  }

  facebookAuth() {
      this.handleGoogleOrFacebookAuth(new FacebookAuthProvider);
  }

  emailAndPasswordAuth(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.currentUserObservable$.pipe(take(1)).subscribe(user => {
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
        this.currentUserObservable$.subscribe(user => {
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

  get currentUserObservable$() { // todo: use savedUserObservable instead
    return user(this.auth);
  }

  get savedUserObservable$(){
    return this.currentUserObservable$.pipe(switchMap(user => {
      return this.firestoreService.userInfo(user?.uid!)
    }));
  }

  private setCurrentUser(user: User | null) {
    if (user) {
      const name = user.displayName?.split(' ')[0];
      const surname = user.displayName?.split(' ')[1];
      const profileImageUrl= user.photoURL;

      this.currentUser = {
        uid: user.uid,
        name,
        surname,
        profileImageUrl: profileImageUrl ? profileImageUrl : ''
      }
    }
  }

  private handleGoogleOrFacebookAuth(provider: AuthProvider) {
    signInWithPopup(this.auth, provider)
      .then(() => {
        this.currentUserObservable$.pipe(
          switchMap(user => {
            if (!user) return of(null);
            this.setCurrentUser(user);
            return this.firestoreService.userInfo(user?.uid!);
          }),
          take(1)).subscribe(savedUser => {
          if (savedUser) {
            this.router.navigate(['authenticated', 'home']);
          } else {
            this.firestoreService.saveUser(this.currentUser!);
            this.router.navigate(['register']);
          }
        });
      });

  }
}
