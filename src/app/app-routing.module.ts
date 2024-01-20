import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoarpetCEPComponent } from './components/doarpetCEP/doarpetCEP.component';
import { EncontrarpetComponent } from './components/encontrarpet/encontrarpet/encontrarpet.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {path:'', redirectTo:'encontrarpet', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'encontrarpet', component:EncontrarpetComponent},
  {path:'dialog', component:DialogComponent},
  {path: 'user', component: MainPageComponent, canActivate:[AuthGuard],
  children: [
    {
      path:'dashboard', component:DashboardComponent,
    },
    {
      path:'doarpetcep', component:DoarpetCEPComponent,
    }
  ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
