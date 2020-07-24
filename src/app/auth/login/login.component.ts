import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loadingState$: Observable<boolean>;
  uiSubscription: Subscription = new Subscription( );
  waitingAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}> ) { }

  ngOnInit( ) {
    this.loadingState$ = this.store.pipe(
      map( stateObj => stateObj.ui ) );
    this.uiSubscription = this.uiService.waitAuthSubscription.subscribe(
      ( authStatus ) => this.waitingAuth = authStatus
     );
  }

  onSubmit( form: NgForm ) {
    console.log(form);
    this.authService.loginUser( {
      email: form.value.email,
      password: form.value.password,
    } )
  }

  ngOnDestroy( ) {
    if( this.uiSubscription ) {
      this.uiSubscription.unsubscribe( );
    }
  }

}