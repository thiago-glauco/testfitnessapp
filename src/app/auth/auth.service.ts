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
    this.authChange.next( true );
  }

  loginUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString( )
    }
    this.authChange.next( true );
  }

  logout( ) {
    this.user = null;
    this.authChange.next( fals );
  }

  getUser( ) {
    return {...this.user};
  }

  isAuth( ) {
      return this.user != null;
  }
}