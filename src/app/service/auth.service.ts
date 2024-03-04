import { Injectable, inject } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, user, User, AuthProvider, getRedirectResult, signInWithRedirect, signInWithCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {BehaviorSubject, map, of, Subject, switchMap, take} from 'rxjs';
import { NotificationService } from './notification.service';
import {FirestoreService} from './firestore.service';
import { UserDetail } from '../model/user-detail.model';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private alertService = inject(NotificationService)
  private firestoreService = inject(FirestoreService);
  private platform = inject(Platform)

  constructor() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize()
    })
  }

  googleAuth() {
    let userObject: UserDetail;

    GoogleAuth.signIn().then((googleUser) => {
      const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);

      console.log('credential',credential);
      

      signInWithCredential(this.auth, credential)
      .then(() => {
        this.currentUserObservable$.pipe(
          switchMap(user => { 
            console.log('reached_ here');
            
            if (!user) return of(null);
            userObject = this.constructUserFromAuthUser(user)
            return this.firestoreService.userInfo(user?.uid!);
          }), take(1)).subscribe(savedUser => {
            if (savedUser && savedUser.hasCompletedRegistration) {
              this.router.navigate(['authenticated', 'home']);
            } else {
              this.firestoreService.saveUser(userObject);
              this.router.navigate(['register']);
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        
      });
    })
    .catch(er => console.log('er', er)
    );
  }

  facebookAuth() {
    signInWithRedirect(this.auth, new FacebookAuthProvider());
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

  handleRedirectResult() {
    let userObject: UserDetail;

    getRedirectResult(this.auth)
      .then(() => {

        this.currentUserObservable$.pipe(
          switchMap(user => { 
            if (!user) return of(null);
            userObject = this.constructUserFromAuthUser(user)
            return this.firestoreService.userInfo(user?.uid!);
          }), take(1)).subscribe(savedUser => {
            if (savedUser && savedUser.hasCompletedRegistration) {
              this.router.navigate(['authenticated', 'home']);
            } else {
              this.firestoreService.saveUser(userObject);
              this.router.navigate(['register']);
            }
          });
      });
  }
}
