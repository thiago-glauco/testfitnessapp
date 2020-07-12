import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Observable<any>;
  selectedExercise: string = '';

  @Output( ) trainingStart = new EventEmitter( );

  constructor( 
    private trainingService: TrainingService,
    private angularFirestore: AngularFirestore ) { }

  ngOnInit() {
    this.exercises = this.angularFirestore.collection('availableExercises').valueChanges( );
  }

  onStartTraining( ) {
    this.trainingService.startExercise( this.selectedExercise );
    //this.trainingStart.emit( );
  } 

}