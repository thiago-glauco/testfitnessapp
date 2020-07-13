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

@Injectable()

export class AuthService {
  authChange = new Subject<boolean>( );
  private user: User;

  constructor( 
    private router: Router,
    private afAuth: AngularFireAuth ) {

  }

  registerUser( authData: AuthData ) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then( (result) => {
        console.log(result);
        this.loginSuccess( );
      })
      .catch( (err) => console.log(err) );
  }

  loginUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString( )
    }
    this.loginSuccess( );
  }

  logout( ) {
    //when user logs out we redirect it to home page.
    this.user = null;
    console.log("User logged out:");
    console.log(this.user);
    this.authChange.next( false );
    this.router.navigate( [''] );
  }

  getUser( ) {
    return {...this.user};
  }

  isAuth( ) {
      return this.user != null;
  }

  private loginSuccess( ) {
    //when user logs in we redirect it to training page.
    this.authChange.next( true );
    console.log("Loged user:");
    console.log(this.user);
    this.router.navigate( ['/training'] );
  }

}