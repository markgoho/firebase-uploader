import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DropFilesDirective } from './drop-files.directive';
import { UploadImagesService } from "./services/upload-images.service";
import { UploadImagesComponent } from './upload-images/upload-images.component';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import 'firebase/storage';

const appRoutes: Routes = [
  // { path: '', component: ListImagesComponent },
  // { path: 'list', component: ListImagesComponent },
  // { path: 'upload', component: UploadImagesComponent },
  // { path: '**', component: ListImagesComponent }
  { path: '', component: UploadImagesComponent },
  { path: 'upload', component: UploadImagesComponent },
  { path: '**', component: UploadImagesComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DropFilesDirective,
    UploadImagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [UploadImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
