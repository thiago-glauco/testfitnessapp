import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import {MatTableDataSource} from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'calories'];
  pastExercisesSubscription: Subscription;
  dataSource = new MatTableDataSource<Exercise>(this.trainingService.getPastExercises( )); 

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy( ) {

  }

}