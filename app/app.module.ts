import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UploadModule } from '@progress/kendo-angular-upload';
import { UploadComponent } from './upload.component';
import { UploadInterceptor } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
    imports:      [ BrowserModule, HttpClientModule, UploadModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule ],
    declarations: [ AppComponent, UploadComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: UploadInterceptor,
        multi: true
      }
    ]
  })

  export class AppModule { }
