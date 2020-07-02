import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {

  @Output() sidNavToggle = new EventEmitter<void>( )
  constructor( public authService: AuthService ) { }

  ngOnInit() {

  }

  onSidNavToggle( ) {
    this.sidNavToggle.emit( );
  }

}