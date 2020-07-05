import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name'];
  pastExercisesSubscription: Subscription;
  dataSource; 

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.pastExercisesSubscription = this.trainingService
      .completedExercisesSubject.subscribe( (exercises) => this.dataSource = exercises );
  }

  ngOnDestroy( ) {
    this.pastExercisesSubscription.unsubscribe( );
  }

}