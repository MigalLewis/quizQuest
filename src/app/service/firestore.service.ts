import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, docData, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

const USER_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private readonly firestore: Firestore = inject(Firestore);
  private readonly authService: AuthService = inject(AuthService);
  private router = inject(Router)
  private uuid!: string;

  constructor() {
    this.authService.currentUser
    .pipe(take(1))
    .subscribe(user => this.uuid = user!.uid);
  }

  saveUser(details: UserDetail) {
     setDoc(doc(this.firestore, USER_COLLECTION, this.uuid), details)
      .then(() => this.router.navigate(['splash']));
  }

  userInfo(uuid: string) {
    return docData(doc(this.firestore, 'users/' + uuid));
  }
}

export interface UserDetail {
  name: string;
  surname: string;
  dateOfBirth: any;
  profileImageUrl: string;
}
