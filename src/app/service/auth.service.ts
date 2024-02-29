import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user, User, AuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {BehaviorSubject, map, of, Subject, switchMap, take} from 'rxjs';
import { NotificationService } from './notification.service';
import {FirestoreService} from './firestore.service';
import { UserDetail } from '../model/user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(NotificationService)
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
        this.savedUserObservable$.pipe(take(1)).subscribe(user => {
          if (user && user.hasCompletedRegistration) {
            this.router.navigate(['authenticated', 'home']);
          } else {
            this.router.navigate(['register']);
          }
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
            const userObject = this.constructUserFromAuthUser(user);
            this.firestoreService.saveUser(userObject);
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

  getUID(): string | null {
    return this.auth.currentUser?.uid || null;
  }

  get savedUserObservable$(){
    return this.currentUserObservable$.pipe(switchMap(user => {
      return this.firestoreService.userInfo(user?.uid!)
    }));
  }

  private constructUserFromAuthUser(user: User): UserDetail {
    return {
      uid: user.uid,
      email: user.email ? user.email : '',
      name: user.displayName ? user.displayName?.split(' ')[0] : '',
      surname: user.displayName ? user.displayName?.split(' ')[1] : '',
      profileImageUrl: user.photoURL ? user.photoURL : '',
      hasCompletedRegistration: false
    }
  }

  private handleGoogleOrFacebookAuth(provider: AuthProvider) {
    let userObject: UserDetail;
    signInWithPopup(this.auth, provider)
      .then(() => {
        this.currentUserObservable$.pipe(
          switchMap(user => {
            if (!user) return of(null);
            userObject = this.constructUserFromAuthUser(user)
            return this.firestoreService.userInfo(user?.uid!);
          }),
          take(1)).subscribe(savedUser => {
          if (savedUser) {
            this.router.navigate(['authenticated', 'home']);
          } else {
            this.firestoreService.saveUser(userObject);
            this.router.navigate(['register']);
          }
        });
      });

  }
}
