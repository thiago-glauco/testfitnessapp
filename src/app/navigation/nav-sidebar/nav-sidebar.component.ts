import { Component, OnInit, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {

  @Output() sidNavToggle = new EventEmitter<void>( )
  constructor() { }

  ngOnInit() {

  }

  onSidNavToggle( ) {
    this.sidNavToggle.emit( );
  }

}