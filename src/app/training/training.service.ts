import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable( )

export class TrainingService {

  availableExercices: Exercise[] = [
    {  id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    {  id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    {  id: 'side-lounge', name: 'Side Lounge', duration: 120, calories: 18 },
    {  id: 'burpee', name: 'Burpee', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise;
  private completedExercises: Exercise[ ] = [];
  runningExerciseSubject: Subject<Exercise> = new Subject( );

  constructor( ) {
   
  }

  getExercices( ) {
    return [...this.availableExercices];
  }

  getExercise( ) {
    return {...this.runningExercise}
  }

  startExercise( exerciseId: string ) {
    this.runningExercise = this.availableExercices.find( ( exercise ) => {
      return exercise.id == exerciseId;
    })
    console.log( 'running exercise: ' );
    console.log( this.runningExercise );
    this.runningExerciseSubject.next( {...this.runningExercise} );
  }

  cancelExercise( ) {

  }

  completeExercise( ) {
    this.completedExercises.push( {...this.runningExercise } );
    this.runningExercise = null;
    this.runningExerciseSubject.next( null );
  }

  exitRunningExercise( ) {

  }

}