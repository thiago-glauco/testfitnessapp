import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';


import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavHeaderComponent } from './navigation/nav-header/nav-header.component';
import { NavSidebarComponent } from './navigation/nav-sidebar/nav-sidebar.component';
import { StopTrainingComponent } from './training/stop-training/stop-training.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    
  ],
  declarations: [ AppComponent, HelloComponent, ProductsComponent, ProductComponent, HomeComponent, SignupComponent, LoginComponent, TrainingComponent, CurrentTrainingComponent, PastTrainingComponent, NewTrainingComponent, WelcomeComponent, NavHeaderComponent, NavSidebarComponent, StopTrainingComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ProductsService],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
