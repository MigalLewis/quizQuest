import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { importProvidersFrom } from '@angular/core';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(IonicStorageModule.forRoot({
          name: '__localdb',
         driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
        })),
      ],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
