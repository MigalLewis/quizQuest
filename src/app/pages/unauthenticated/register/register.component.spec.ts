import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterComponent } from './register.component';
import { FirestoreService } from 'src/app/service/firestore.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import {importProvidersFrom} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage-angular";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {connectFirestoreEmulator} from "@firebase/firestore";
import {AuthService} from "../../../service/auth.service";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['']);
    const fireStorageServiceSpy = jasmine.createSpyObj('FireStorageService', ['']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    await TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceSpy},
        { provide: FireStorageService, useValue: fireStorageServiceSpy},
        { provide: AuthService, useValue: authServiceSpy}
      ],
    }).compileComponents();
  });

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
