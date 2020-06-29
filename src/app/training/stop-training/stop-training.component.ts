import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.css']
})
export class StopTrainingComponent implements OnInit {

  constructor(
    @Inject( MAT_DIALOG_DATA ) public receivedData: any,
    public dialogRef: MatDialogRef<any>,) { }

  ngOnInit() {
  }

  continue() {
    this.receivedData.continue = true;
  }

  exit( ) {
    this.receivedData.continue = false;
  }

}