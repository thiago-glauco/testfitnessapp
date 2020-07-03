import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining: boolean = false;
  execiseSubscription: Subscription;

  constructor( private trainingService: TrainingService) { }

  ngOnInit( ) {
    let that = this;
    this.execiseSubscription = this.trainingService.runningExerciseSubject.subscribe( 
      exercise => this.ongoingTraining = ( exercise != null ? true : false )
     );
    
  }

  ngOnDestroy( ) {
    this.execiseSubscription.unsubscribe( );
  }

}