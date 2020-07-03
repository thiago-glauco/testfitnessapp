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
  runningExerciseSubject: Subject<boolean> = new Subject( );

  constructor( ) {
    this.runningExerciseSubject.next( false );
  }

  getExercices( ) {
    return [...this.availableExercices];
  }

  startExercise( exerciseId: string ) {
    this.runningExercise = this.availableExercices.find( ( exercise ) => {
      exercise.id === exerciseId;
    })
    this.runningExerciseSubject.next( true );
  }

}