import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';

import { CustomPhoto } from '../model/photo.model';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
const FOLDERS_PATH = 'filevisor/folders';
const DOCUMENTS_DIRECTORY = Directory.Documents;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: CustomPhoto[] = [];
  private platform: Platform;

  constructor(platform: Platform) { 
    this.platform = platform;
  }

  public async takePhoto(folderId: string) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile = await this.savePicture(capturedPhoto, folderId);
    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
    
  }

  async uploadPhotos(folderId: string) {
    const { photos } = await Camera.pickImages({
      quality: 100
    }); 

    for (const photo of photos) {
      const savedImageFile = await this.savePicture(photo, folderId);
      this.photos.unshift(savedImageFile);
    }
    
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

private async savePicture(photo: Photo | GalleryPhoto, folderId: string) {
  /** 
     * Convert photo to base64 format, required by Filesystem API to save 
     */
  const base64Data = await this.readAsBase64(photo);

  /** Write the file to the data directory */
  const fileName = Date.now() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: `${FOLDERS_PATH}/${folderId}/${fileName}`,
    data: base64Data,
    directory: DOCUMENTS_DIRECTORY,
    recursive: true
  });

  if (this.platform.is('hybrid')) {
    /**
     * Display the new image by rewriting the 'file://' path to HTTP
     */
    return {
      id: 'IMG_' + Date.now(),
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      folderId: folderId
    };
  }
  else {
    /** 
     * Use webPath to display the new image instead of base64 since it's already loaded into memory
    */
    return {
      id: 'IMG_' + Date.now(),
      filepath: fileName,
      webviewPath: photo.webPath,
      folderId: folderId
    };
  }
}

  private async readAsBase64(photo: Photo| GalleryPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  public async loadSaved(folderId: string) {
    /**
     * Retrieve cached photo array data
     */
    const { value } = await Preferences.get({ key: PHOTO_STORAGE });
    let photos = (value ? JSON.parse(value) : []) as CustomPhoto[];
  
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of photos) {
        
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
            path: `${FOLDERS_PATH}/${folderId}/${photo.filepath}`,
            directory: DOCUMENTS_DIRECTORY
        });
  
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }

    if (photos.length > 0) {
      photos = photos.filter(photo => photo.folderId === folderId);
    }

    return photos;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async loadPhoto(folderId: string, photoId: string) {
    return (await this.loadSaved(folderId)).find(photo => photo.id === photoId);
  }

  async deletePhoto(folderId: string, photoId: string) {
    const { value } = await Preferences.get({ key: PHOTO_STORAGE });
    let photos = (value ? JSON.parse(value) : []) as CustomPhoto[];

    const photo = await this.loadPhoto(folderId, photoId);

    photos = photos.filter(photo => photo.id !== photoId);
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(photos),
    });
    
    return await Filesystem.deleteFile({
      path: `${FOLDERS_PATH}/${folderId}/${photo?.filepath}`,
      directory: DOCUMENTS_DIRECTORY
  });

  }
}
