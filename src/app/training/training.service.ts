import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable( )

export class TrainingService {

  availableExercices: Exercise[] = [ ];
  exercisesChanged: Subject<Exercise[]> = new Subject( ); 
  private runningExercise: Exercise;
  private completedExercises: Exercise[ ] = [];
  runningExerciseSubject: Subject<Exercise> = new Subject( );
  completedExercisesSubject: Subject<Exercise[]> = new Subject( );

  constructor(private db: AngularFirestore ) {
   
  }

  fetchExercises( ) {
    this.db
      .collection('availableExercises')
      .snapshotChanges( )
      .pipe(
       map( docArray => {
         return docArray.map( exercise => {
           return {
             id: exercise.payload.doc.id,
             ... exercise.payload.doc.data( ) }
         })
       })
      ).subscribe( ( exercises: Exercise[] ) => {
        this.availableExercices = exercises;
        this.exercisesChanged.next( [... this.availableExercices ] );
        } );
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

  cancelExercise( progress: number ) {
    this.completedExercises.push( {
      ...this.runningExercise,
      date: new Date( ),
      duration: this.runningExercise.duration * (progress/100),
      calories: this.runningExercise.calories * (progress/100),
      state: 'cancelled',
    } );
    this.runningExercise = null;
    this.runningExerciseSubject.next( null );
    this.completedExercisesSubject.next( [...this.completedExercises] )
  }

  completedExercise( ) {
    this.completedExercises.push( {
      ...this.runningExercise,
      date: new Date( ),
      state: 'completed'
    } );
    this.runningExercise = null;
    this.runningExerciseSubject.next( null );
    this.completedExercisesSubject.next( [...this.completedExercises] )
  }

  getPastExercises( ) {
    return [...this.completedExercises]
  }

  exitRunningExercise( ) {

  }

}