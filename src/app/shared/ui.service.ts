import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable( )

export class UiService {

  constructor( 
    private snackBar: MatSnackBar,
   ) { }

waitAuthSubscription: Subject<boolean> = new Subject( );

waitDatabaseSubscription: Subject<boolean> = new Subject( );


snackBarError( err ) {
  this.snackBar.open( err.message, '', { duration: 5000 } )
}


}