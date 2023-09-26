import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';

import { CustomPhoto } from '../model/photo.model';
import { Capacitor } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: CustomPhoto[] = [];
  private platform: Platform;

  constructor(platform: Platform) { 
    this.platform = platform;
  }

  public async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
    
  }

  private async savePicture(photo: Photo) {
    /** 
     * Convert photo to base64 format, required by Filesystem API to save 
     */
    const base64Data = await this.readAsBase64(photo);
  
    /** Write the file to the data directory */
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
   
    /**
     * Display the new image by rewriting the 'file://' path to HTTP
     */
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }

  private async readAsBase64(photo: Photo) {
      /** 
       * Read the file into base64 format 
       */
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    
  }

  public async loadSaved() {
    /**
     * Retrieve cached photo array data
     */
    const { value } = await Preferences.get({ key: PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as CustomPhoto[];
  }
}
