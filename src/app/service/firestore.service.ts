import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const USER_COLLECTION = 'company';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private readonly firestore: Firestore = inject(Firestore);
  private readonly authService: AuthService = inject(AuthService);
  private router = inject(Router)
  private uuid!: string;

  constructor() {
    this.authService.currentUser.subscribe(user => this.uuid = user!.uid);
  }

  saveUser(details: UserDetail) {
     setDoc(doc(this.firestore, USER_COLLECTION, this.uuid), details)
      .then(() => this.router.navigate(['splash']));
  }
}

export interface UserDetail {
  name: string;
  surname: string;
  dateOfBirth: any;
  profileImageUrl: string;
}
