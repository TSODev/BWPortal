import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { FormsModule } from '@angular/forms';
import { BackendDatastoreService } from './services/backend-datastore.service';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfigComponent } from './config/config.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    ModalFormComponent,
    ConfigComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    BackendDatastoreService,
    CommonService,
    HttpClientModule,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
