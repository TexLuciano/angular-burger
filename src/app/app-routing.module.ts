import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authorizationGuard } from './guard/authorization.guard';

const routes: Routes = [
  {
    path: '', redirectTo:'home',  pathMatch: 'full'
  },
  {
    path: '', loadChildren:()=>import('./pages/pages-routing.module').then(m => m.PagesRoutingModule), canActivate: [authorizationGuard]

  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
