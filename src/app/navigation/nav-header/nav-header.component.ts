import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  hasUserObservable: Observable<any>;
  hasUser: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.hasUserObservable = this.authService.authChange.subscribe(
    ( data ) => {
        console.log( data );
        this.hasUser = data;
    }
   );
  }

}