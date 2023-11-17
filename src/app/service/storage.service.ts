import { Injectable } from '@angular/core';
import { Folder } from '../model/folder.model';
import { Filesystem, Directory } from '@capacitor/filesystem';
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
  
      if (folders.some(folder => folder.id === newFolder.id)) {
        throw new Error('This folder already exists!');
      }
  
      await Filesystem.mkdir({
        path: `${FOLDERS_PATH}/${newFolder.id}`,
        directory: DOCUMENTS_DIRECTORY,
        recursive: true
      });
  
      folders.push(newFolder);
      await Preferences.set({
        key: FOLDERS_KEY,
        value: JSON.stringify(folders),
      });
      
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async getFolders(): Promise<Folder[]> {
      const { value } = await Preferences.get({ key: FOLDERS_KEY });
      return (value ? JSON.parse(value) : []) as Folder[];
  }

}
