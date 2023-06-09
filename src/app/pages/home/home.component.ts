import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Categories, Product } from '../types/types';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products!: Product[];
  categories!: Categories[];
  cartProducts!: Observable<Product[]>;

  constructor(
    private api: ServiceService,
    private cartService: CartService
  ) {
    this.cartProducts = this.cartService.cartProducts$
    
  }

    putProductInCart(product:Product){
      this.cartService.putProductInCart(product)
    }

    removeProduct(product:Product){
      this.cartService.removeProduct(product)
    }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res: Product[]) => {
      console.log(res);
      const filtered = res.filter((item) => {
        return item.offer === true;
      });
      this.products = filtered;
    });

    this.api.getCategories().subscribe((res: Categories[]) => {
      console.log(res);
      this.categories = res;
    });
    
  }
}
