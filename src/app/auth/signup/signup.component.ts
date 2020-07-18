import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs'
import { UiService } from '../../shared/ui.service';
;@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate: Date;
  uiSubscription: Subscription = new Subscription( );
  waitingAuth: boolean = false;

  constructor( 
    private authService: AuthService,
    private uiService: UiService ) { }

  ngOnInit() {
    this.maxDate = new Date( );
    this.maxDate.setFullYear( this.maxDate.getFullYear( ) - 18 );
    this.uiSubscription = this.uiService.waitAuthSubscription.subscribe(
      ( authStatus ) => this.waitingAuth = authStatus
     );
  }

  onSubmit( form: NgForm ) {
    console.log(form);
    this.authService.registerUser( {
      email: form.value.email,
      password: form.value.password,
      birthDate: form.value.birthDate,
    } )
  }

}