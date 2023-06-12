import { ToastService } from 'angular-toastify';
import { Product } from './../types/types';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/services/service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total!: number;
  dataSource!: MatTableDataSource<Product>;

  // cartProducts!:Observable<Product[]>

  constructor(
    private cartService: CartService,
    private api: ServiceService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.cartService.index());
    console.log(this.dataSource);
    this.ObterTotal();
  }

  cartProductPlus(product: Product) {
    this.cartService.plusProduct(product);
    this.dataSource.data = this.cartService.index();
    this.ObterTotal();
  }
  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
    this.dataSource.data = this.cartService.index();
    this.ObterTotal();
  }

  ObterTotal() {
    const total = this.cartService.index().reduce((acc, product) => {
      return Number(product.price) * product.quantity + acc;
    }, 0);

    this.total = total;
  }

  sendOrder() {
    const cartArray = localStorage.getItem('cart');

    if (cartArray) {
      const cart = JSON.parse(cartArray);

      const newArray = cart.map((product: Product) => {
        return { id: product.id, quantity: product.quantity };
      });

      this.api.sendOrder(newArray).subscribe(
        (res) => {
          if (res.user) {
            this.toast.success('Pedido Realizado!');
          }
        },

        (error: HttpErrorResponse) => {
          if (error) {
            this.toast.error('Tente mais tarde');
          }
        }
      );
    }
  }

  displayedColumns: string[] = ['url', 'Itens', 'Preço', 'Quantidade', 'Total'];
}
