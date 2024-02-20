import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFirestoreEmulator } from '@firebase/firestore';

describe('FirestoreService', () => {
  let service: FirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(IonicStorageModule.forRoot({})),
        importProvidersFrom(
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideFirestore(() => {
            const firestore = getFirestore();
            environment.useEmulators ? connectFirestoreEmulator(firestore, 'localhost', 8080) : '';
            return firestore
          }),
        )
      ],
    });
    service = TestBed.inject(FirestoreService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
