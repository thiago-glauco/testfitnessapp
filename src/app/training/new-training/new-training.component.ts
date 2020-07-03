import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Exercise[] = [];

  @Output( ) trainingStart = new EventEmitter( );

  constructor( private trainingService: TrainingService ) { }

  ngOnInit() {
    this.exercises = this.trainingService.getExercices( );
  }

  onStartTraining( ) {
    this.trainingStart.emit( );
  } 

}