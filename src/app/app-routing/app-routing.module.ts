import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'training', loadChildren:"../training/training.module#TrainingModule", canLoad: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [ 
    RouterModule
  ],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { }