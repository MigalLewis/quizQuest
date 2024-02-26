import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { connectAuthEmulator } from '@firebase/auth';
import {connectFirestoreEmulator, getFirestore, provideFirestore} from "@angular/fire/firestore";

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(IonicStorageModule.forRoot({})),
        importProvidersFrom(
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideAuth(() => {
            const auth = getAuth();
            environment.useEmulators ? connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true }) : '';
            return auth;
          }),
          provideFirestore(() => {
            const firestore = getFirestore();
            environment.useEmulators ? connectFirestoreEmulator(firestore, 'localhost', 8080) : '';
            return firestore
          })
        ),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
