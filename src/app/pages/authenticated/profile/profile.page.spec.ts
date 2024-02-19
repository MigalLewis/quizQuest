import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import {FirestoreService} from "../../../service/firestore.service";
import {FireStorageService} from "../../../service/fire-storage.service";

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async() => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['']);
    const firestorageServiceSpy = jasmine.createSpyObj('FireStorageService', ['']);
    await TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceSpy },
        { provide: FireStorageService, useValue: firestorageServiceSpy },
      ]
    }).compileComponents();
  })

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
