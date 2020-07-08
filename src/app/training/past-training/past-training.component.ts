import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import {MatSort} from '@angular/material/sort';
 
import {MatTableDataSource} from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  pastExercisesSubscription: Subscription;
  dataSource = new MatTableDataSource<Exercise>(); 

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercises( );
  }

  ngAfterViewInit( ) {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy( ) {

  }

}