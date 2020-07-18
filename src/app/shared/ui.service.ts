import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable( )

export class UiService {

waitAuthSubscription: Subject<boolean> = new Subject( );


}