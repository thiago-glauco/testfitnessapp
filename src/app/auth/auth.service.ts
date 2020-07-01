import { User } from './user.module';
import { AuthData } from './auth-data.module';

export class AuthService {
  private user: User;

  registerUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString( );
    }
  }

  loginUser( authData: AuthData ) {
    this.user = {
      email: authData.email,
      userId: Math.round( Math.random() * 10000 ).toString( );
    }
  }

  logout( ) {
    this.user = null;
  }

  getUser( ) {
    return {...this.user};
  }
}