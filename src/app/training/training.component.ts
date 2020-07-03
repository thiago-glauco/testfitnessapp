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
  ongoingTrainingSubscription: Subscription;

  constructor( private trainingService: TrainingService) { }

  ngOnInit( ) {
    this.ongoingTrainingSubscription = this.trainingService.runningExerciseSubject.subscribe( {
       next(data) {this.ongoingTraining = data}
    } );
    
  }

  ngOnDestroy( ) {
    this.ongoingTrainingSubscription.unsubscribe( );
  }

}