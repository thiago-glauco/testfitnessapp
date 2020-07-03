import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../TrainingService';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter( );
  progress: number = 0;
  stopProgress: number;
  running: boolean = true;
  icon: string = 'pause';
  buttonName: string = 'Pause';
  continue: boolean = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.stopProgress = setInterval( ( ) => {
      this.progress += 5;
      this.progress >= 100 ? clearInterval( this.stopProgress ) : ""; 
    }, 1000)
  }
  pausePlayTraining( ) {
    if( this.running ) {
      this.stopTimer( );
      this.icon = 'play_arrow';
      this.buttonName = 'Start';
    } else {
      this.startTimer( )
      this.icon = 'pause';
      this.buttonName = 'Pause';
    }
    this.running = !this.running;
  }

  private startTimer( ) {
    this.stopProgress = setInterval( ( ) => {
      this.progress += 5;
      this.progress >= 100 ? clearInterval( this.stopProgress ) : ""; 
    }, 1000 )
  }

  

  resetTimer( ) {
    this.progress = 0;
  }

  private stopTimer( ) {
     clearInterval( this.stopProgress );
  }



  stopTraining( ) {
    this.stopTimer();
    const dialogRef = this.dialog.open( StopTrainingComponent, {
      data: {
        progress: this.progress,
        continue: this.continue
      }
    } );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.continue = result;
      console.log( this.continue );
      result ? this.trainingExit.emit( ) : this.pausePlayTraining( );
    });

    console.log(  this.continue );
  }

}