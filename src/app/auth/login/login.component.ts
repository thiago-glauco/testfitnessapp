import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit( ) {

  }

  onSubmit( form: NgForm ) {
    console.log(form);
    this.authService.loginUser( {
      email: form.value.email,
      password: form.value.password,
    } )
  }

}