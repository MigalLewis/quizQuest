import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';

const USER_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private readonly firestore: Firestore = inject(Firestore);

  saveUser(details: UserDetail, uid: string) {
     setDoc(doc(this.firestore, USER_COLLECTION, uid), details);
  }

  userInfo(uuid: string) {
    return docData(doc(this.firestore, 'users/' + uuid));
  }
}

export interface UserDetail {
  uid?: string;
  name?: string;
  surname?: string;
  dateOfBirth?: any;
  profileImageUrl?: string;
}
