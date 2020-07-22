import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingRoutingModule } from './training-routing.module';
 
@NgModule({
  declarations: [ 
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
    NewTrainingComponent
   ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    TrainingRoutingModule
  ],
  exports: [ ],
  entryComponents: [ StopTrainingComponent ]
})

export class TrainingModule {

}