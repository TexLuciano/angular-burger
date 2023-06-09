import { Product } from './../types/types';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  dataSource!: MatTableDataSource<Product>;
  // cartProducts!:Observable<Product[]>

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.cartService.index());
    console.log(this.dataSource);
  }

  cartProductPlus(product: Product) {
    this.cartService.plusProduct(product);
    this.dataSource.data = this.cartService.index();
  }
  removeProduct(product:Product){
    this.cartService.removeProduct(product);
    this.dataSource.data = this.cartService.index();
  }

  displayedColumns: string[] = ['url', 'Itens', 'Preço', 'Quantidade', 'Total'];
}
