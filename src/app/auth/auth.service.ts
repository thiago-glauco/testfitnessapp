import { User } from './user.module';
import { AuthData } from './auth-data.module';
import { Subject } from 'rxjs';

export class AuthService {
  authChange = new Subject<boolean>( );
  private user: User;

  registerUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString( )
    }
    console.log(this.user);
    this.authChange.next( true );
  }

  loginUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString( )
    }
    console.log("Loged user:");
    console.log(this.user);
    this.authChange.next( true );
  }

  logout( ) {
    this.user = null;
    console.log("User logged out:");
    console.log(this.user);
    this.authChange.next( false );
  }

  getUser( ) {
    return {...this.user};
  }

  isAuth( ) {
      return this.user != null;
  }
}