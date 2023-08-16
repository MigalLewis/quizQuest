import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Folder } from '../model/folder.model';

const FOLDERS_KEY = 'folders';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  public async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    return await this.storage.create();
  }

  async addFolder(newFolder: Folder): Promise<any> {
    try {
      const folders: Folder[] = await this.storage.get(FOLDERS_KEY);

      if (folders) {
        folders.forEach(folder => {
          if (folder.id === newFolder.id) {
            throw new Error('This folder already exists!');
          }
        })

        folders.push(newFolder);
        return this.storage.set(FOLDERS_KEY, folders);
      } else {
        return this.storage.set(FOLDERS_KEY, [newFolder ])
      }
    } catch (error) {
      // todo: must display a notification to user
      return error;
    }
  }

  async getFolders(): Promise<Folder[]> {
    return this.storage.get(FOLDERS_KEY);
  }

  async updateFolder(modifiedFolder: Folder): Promise<any> {
    const folders: Folder[] = await this.storage.get(FOLDERS_KEY);
    if (!folders || folders.length === 0) {
      return null;
    }

    let newFolders: Folder[] = [];
    folders.forEach(folder => newFolders.push( modifiedFolder.id === folder.id ? modifiedFolder : folder));

    return this.storage.set(FOLDERS_KEY, newFolders);

  }

  async deleteFolder(id: string) {
    const folders: Folder[] = await this.storage.get(FOLDERS_KEY);
    if (!folders || folders.length === 0) {
      return null;
    }

    let newFolders: Folder[] = [];
    folders.forEach(folder => id !== folder.id ? newFolders.push(folder) : '');

    return this.storage.set(FOLDERS_KEY, newFolders);
  }

}
