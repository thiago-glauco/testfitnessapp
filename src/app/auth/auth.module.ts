import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule( {
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: [ ],
} )

export class AuthModule {

}