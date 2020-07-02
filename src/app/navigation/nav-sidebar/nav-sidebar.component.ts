import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {
  hasUserObservable: Observable<any>;
  hasUser: boolean;

  @Output() sidNavToggle = new EventEmitter<void>( )
  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.hasUserObservable = this.authService.authChange.subscribe(
    ( data ) => {
        console.log( data );
        this.hasUser = data;
    }
   );

  }

  onSidNavToggle( ) {
    this.sidNavToggle.emit( );
  }

}