import { ToastService } from 'angular-toastify';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Categories, Product } from '../types/types';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    private cartService: CartService,
    private toast:ToastService,
    private router:Router
    ) {
    this.cartProducts = this.cartService.cartProducts$;
  }

  putProductInCart(product: Product) {
    this.toast.success(`+${product.name}`);
    this.cartService.putProductInCart(product);
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  getCategory(category:Categories){
    const estado = {
      category: category.id
    }
    this.router.navigate(['produtos', estado ])
    console.log();
    
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
