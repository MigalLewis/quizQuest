import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async createFolder(foldername: string) {
    const key = foldername.replace(' ', '_').toLowerCase();
    const storedKeys = await this.storage.keys();
    
    try {
      if(storedKeys.includes(key)) {
        throw new Error('This folder already exists!');
      }
      return await this._storage?.set( key, { name: foldername });
    } catch (error) {
      return error;
    }
  }
}
