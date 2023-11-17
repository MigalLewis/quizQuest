import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFirestoreEmulator } from '@firebase/firestore';
import { AuthService } from './auth.service';

describe('FirestoreService', () => {
  let service: FirestoreService;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
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
        ),
        { provide: AuthService, useValue: authServiceSpy}
      ],
    });
    service = TestBed.inject(FirestoreService);
    
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
