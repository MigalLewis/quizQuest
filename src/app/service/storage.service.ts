import { Injectable } from '@angular/core';
import { Folder } from '../model/folder.model';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

const FOLDERS_KEY = 'folders';
const FOLDERS_PATH = 'filevisor/folders';
const DOCUMENTS_DIRECTORY = Directory.Documents;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  async addFolder(newFolder: Folder): Promise<void> {
    try {
      const folders: Folder[] = await this.getFolders() || [];

      if ((await Filesystem.checkPermissions()).publicStorage !== 'granted')
        if ((await Filesystem.requestPermissions()).publicStorage !== 'granted')
        return;
  
      if (folders.some(folder => folder.id === newFolder.id)) {
        throw new Error('This folder already exists!');
      }
  
      await Filesystem.mkdir({
        path: `${FOLDERS_PATH}/${newFolder.name}`,
        directory: DOCUMENTS_DIRECTORY,
        recursive: true
      });
  
      folders.push(newFolder);
      await Preferences.set({
        key: FOLDERS_KEY,
        value: JSON.stringify(folders),
      });
      
    } catch (error) {
      console.error('Error adding folder:', error);
      // or, rethrow the error for the component to handle
      throw error;
    }
  }

  public async getFolders(): Promise<Folder[]> {
      const { value } = await Preferences.get({ key: FOLDERS_KEY });
      return (value ? JSON.parse(value) : []) as Folder[];
  }

}
