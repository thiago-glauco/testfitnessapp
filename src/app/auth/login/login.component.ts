import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uiSubscription: Subscription = new Subscription( );
  waitingAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private uiService: UiService ) { }

  ngOnInit( ) {
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

}