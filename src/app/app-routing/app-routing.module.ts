import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { TrainingComponent } from '../training/training.component';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
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