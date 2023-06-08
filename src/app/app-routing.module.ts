import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: '', redirectTo:'home',  pathMatch: 'full'
  },
  {
    path: 'home', loadChildren:()=>import('./pages/pages-routing.module').then(m => m.PagesRoutingModule)
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
