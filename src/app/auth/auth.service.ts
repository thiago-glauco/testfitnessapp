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
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable()

export class AuthService {

  authChange = new Subject<boolean>( );
  private isAuthenticated: boolean = false;

  constructor( 
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>
  ) { }

  registerUser( authData: AuthData ) {
    //this.uiService.waitAuthSubscription.next( true );
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then( (result) => {
        console.log(result);
        this.loginSuccess( );
      })
      .catch( (err) => {
        //this.uiService.waitAuthSubscription.next( false )
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.snackBarError(err);
        }  );
  }

  loginUser( authData: AuthData ) {
    //this.uiService.waitAuthSubscription.next( true );
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then( (result) => {
        this.loginSuccess( );
      })
      .catch( (err) => {
        //this.uiService.waitAuthSubscription.next( false );
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.snackBarError(err);
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
    //this.uiService.waitAuthSubscription.next( false );
    this.store.dispatch({type: 'STOP_LOADING'});
    this.isAuthenticated = true;
    this.router.navigate( ['/training'] );
  }

}