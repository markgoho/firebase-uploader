import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FileItem } from "../file-item";

@Injectable()
export class UploadImagesService {

  private IMAGES_FOLDER: string = 'images';

  constructor(public db: AngularFireDatabase, private fb: FirebaseApp) { }

  listLastImages(numberOfImages: number): FirebaseListObservable<any[]>{
    return this.db.list(`/${this.IMAGES_FOLDER}`, {
      query: {
        limitToLast: numberOfImages
      }
    });    
  }

  uploadImagesToFirebase(files: FileItem[]) {
    let storageRef = this.fb.storage().ref();

    files.forEach((item: FileItem) => {
      item.isUploading = true;
      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.IMAGES_FOLDER}/${item.file.name}`).put(item.file);   
      
      uploadTask.on('state_changed', 
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.saveImage({ name: item.file.name, url: item.url });
        }
      );
    });
    
  }

  private saveImage(image:any) {
    this.db.list(`/${this.IMAGES_FOLDER}`).push(image);
  }

}
