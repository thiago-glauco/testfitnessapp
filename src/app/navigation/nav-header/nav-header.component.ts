import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { of, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, OnDestroy {

  hasUserObservable: Subscription;
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

  ngOnDestroy( ) {
    this.hasUserObservable.unsubscribe( );
  }

}