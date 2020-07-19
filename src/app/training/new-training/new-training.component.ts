import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UiService } from '../../shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises:Exercise[ ];
  exerciseSubscription: Subscription = new Subscription( );
  selectedExercise: string = '';
  waitingExercisesSubscription: Subscription;
  hasLoadedExercises: boolean = false;

  @Output( ) trainingStart = new EventEmitter( );

  constructor( 
    private trainingService: TrainingService,
    private angularFirestore: AngularFirestore,
    private uiService: UiService ) { }

  ngOnInit() {
    this.trainingService.fetchExercises( );
    this.waitingExercisesSubscription = this.uiService
      .waitDatabaseSubscription.subscribe( ( loaded: boolean ) => {
        this.hasLoadedExercises = loaded
      });
    this.exerciseSubscription = this.trainingService
      .exercisesChanged
      .subscribe( exercises => this.exercises = exercises );
  }

  ngOnDestroy( ) {
    this.waitingExercisesSubscription.unsubscribe( );
    this.exerciseSubscription.unsubscribe( );
  }

  onStartTraining( ) {
    this.trainingService.startExercise( this.selectedExercise );
    //this.trainingStart.emit( );
  } 

}