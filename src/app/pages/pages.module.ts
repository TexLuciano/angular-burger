import { ToastService , AngularToastifyModule} from 'angular-toastify';
import { FormatecurrencyPipe } from './../pipes/formatecurrency.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProdutosComponent } from './produtos/produtos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CartComponent } from './cart/cart.component';
import { MatTableModule } from '@angular/material/table'
import { AsyncPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ProdutosComponent,
    CartComponent, 
    FormatecurrencyPipe,
  ],
  providers:[AsyncPipe ,ToastService],
  imports: [
    CommonModule,
    PagesRoutingModule,
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    AngularToastifyModule,
    MatTabsModule
  ],
  
})
export class PagesModule { }
