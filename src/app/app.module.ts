import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { UiService } from './shared/ui.service';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavHeaderComponent } from './navigation/nav-header/nav-header.component';
import { NavSidebarComponent } from './navigation/nav-sidebar/nav-sidebar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ENVIRONMENT } from './environment/environment';
import { appReducer } from './app.reducer';

@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(ENVIRONMENT.firebase),
    AngularFirestoreModule,
    AuthModule,
    TrainingModule,
    StoreModule.forRoot( { ui: appReducer } )
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    WelcomeComponent,
    NavHeaderComponent,
    NavSidebarComponent,
  ],
  bootstrap:    [ AppComponent ],
  providers: [ProductsService, AuthService, TrainingService, UiService ],
  entryComponents: [ ]
})
export class AppModule { }
