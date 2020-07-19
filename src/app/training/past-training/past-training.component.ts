import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import { UiService } from '../../shared/ui.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
 
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
  waitExercise: Subscription;
  hasLoadedExercise: boolean = false;
  dataSource = new MatTableDataSource<Exercise>(); 


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatSort;

  doFilter(filterString: string) {
    this.dataSource.filter = filterString.trim( ).toLowerCase( );
  }

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.waitExercise = this.uiService.waitDatabaseSubscription.subscribe(
      ( loaded: boolean ) => this.hasLoadedExercise = loaded
    );
    this.trainingService.fetchPastExercises( );
    this.pastExercisesSubscription = this.trainingService
      .completedExercisesSubject
      .subscribe( (exercises: Exercise) => {
        exercises.forEach( (exercise) => {
          console.log(exercise.date);
          exercise.date = exercise.date.toLocaleString( )
        } );
        this.dataSource.data = exercises
      } );
  }

  ngAfterViewInit( ) {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy( ) {
    this.waitExercise.unsubscribe( );
    this.pastExercisesSubscription.unsubscribe( );
  }

}