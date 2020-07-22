import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Route[] = [
{ path: '', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
  exports: [ 
    RouterModule
  ],
  providers: [AuthGuard],
  declarations: []
})
export class TrainingRoutingModule { }
