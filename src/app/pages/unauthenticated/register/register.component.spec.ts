import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterComponent } from './register.component';
import { FirestoreService } from 'src/app/service/firestore.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['']);
    const fireStorageServiceSpy = jasmine.createSpyObj('FireStorageService', ['']);
    await TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceSpy},
        { provide: FireStorageService, useValue: fireStorageServiceSpy}
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
