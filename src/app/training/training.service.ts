import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from '../shared/ui.service';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable( )

export class TrainingService {

  availableExercices: Exercise[] = [ ];
  exercisesChanged: Subject<Exercise[]> = new Subject( ); 
  private runningExercise: Exercise;
  private completedExercises: Exercise[ ] = [];
  runningExerciseSubject: Subject<Exercise> = new Subject( );
  completedExercisesSubject: Subject<Exercise[]> = new Subject( );
  private firebaseSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService ) {
   
  }

  fetchExercises( ) {
    this.uiService.waitDatabaseSubscription.next( true );
    this.firebaseSubscriptions
    .push(
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
          this.uiService.waitDatabaseSubscription.next( false )
        },
        (err) => {
          console.log( err.message );
          this.uiService.waitDatabaseSubscription.next( false );
          this.availableExercices = [];
          this.exercisesChanged.next( null );
          this.uiService.snackBarError( err );
        } )
    );
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
    this.addDataToDatabase( {
      ...this.runningExercise,
      date: new Date( ).toDateString(),
      duration: this.runningExercise.duration * (progress/100),
      calories: this.runningExercise.calories * (progress/100),
      state: 'cancelled',
    } );
    this.runningExercise = null;
    this.runningExerciseSubject.next( null );
    //this.completedExercisesSubject.next( [...this.completedExercises] )
  }

  completedExercise( ) {
    this.addDataToDatabase( {
      ...this.runningExercise,
      date: new Date( ).toDateString(),
      state: 'completed'
    } );
    this.runningExercise = null;
    this.runningExerciseSubject.next( null );
    //this.completedExercisesSubject.next( [...this.completedExercises] )
  }

  fetchPastExercises( ) {
    this.uiService.waitDatabaseSubscription.next( true );
    this.firebaseSubscriptions
      .push(
        this.db
          .collection('finishedExercises')
          .valueChanges( )
          .subscribe( (exercises: Exercise[]) => {
            this.completedExercisesSubject.next( exercises );
            this.uiService.waitDatabaseSubscription.next( false );
          },
          (err) => {
            console.log(err.message);
            this.uiService.waitDatabaseSubscription.next( false );
            this.uiService.snackBarError( err );
          })
    );
  }

  exitRunningExercise( ) {

  }

  cancelSubscriptions( ) {
    this.firebaseSubscriptions.forEach( 
      (sub) => { 
        sub.unsubscribe( );
    })
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
    .then( ( result ) => { console.log( "data added to firestore") } )
    .catch( ( err ) => this.uiService.snackBarError( err ) );
  }

}