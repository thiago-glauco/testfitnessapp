/**
 * This service is mocking the responses of an authentication backend.
 * I'm using a Subject to emit authentication changes events
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.module';
import { AuthData } from './auth-data.module';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';

@Injectable()

export class AuthService {

  authChange = new Subject<boolean>( );
  private isAuthenticated: boolean = false;

  constructor( 
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UiService ) {

  }

  registerUser( authData: AuthData ) {
    this.uiService.waitAuthSubscription.next( true );
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then( (result) => {
        console.log(result);
        this.loginSuccess( );
      })
      .catch( (err) => {
        this.uiService.waitAuthSubscription.next( false )
        this.onError(err);
        }  );
  }

  loginUser( authData: AuthData ) {
    this.uiService.waitAuthSubscription.next( true );
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then( (result) => {
        this.loginSuccess( );
      })
      .catch( (err) => {
        this.uiService.waitAuthSubscription.next( false );
        this.onError(err);
      } );
  }

  logout( ) {
    this.afAuth.signOut( );
    //when user logs out we redirect it to home page.
    this.isAuthenticated = false;
    this.trainingService.cancelSubscriptions( );
    this.authChange.next( false );
    this.router.navigate( [''] );
  }

  getUser( ) {

  }

  isAuth( ) {
      return this.isAuthenticated;
  }

  private loginSuccess( ) {
    //when user logs in we redirect it to training page.
    this.authChange.next( true );
    this.uiService.waitAuthSubscription.next( false );
    this.isAuthenticated = true;
    this.router.navigate( ['/training'] );
  }

  private onError( err ) {
    this.snackBar.open( err.message, '', { duration: 5000 } )
  }

}