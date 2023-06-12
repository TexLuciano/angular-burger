import { ToastService } from 'angular-toastify';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Categories, Product } from '../types/types';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  constructor(
    private api: ServiceService,
    private route: ActivatedRoute,
    private cart: CartService,
    private toast:ToastService
  ) {}

  products!: Product[];
  categories!: Categories[];
  category!: any;
  selectedIndex = 0;

  tabChanged(event: any) {
    this.selectedIndex = event.index;
    console.log('Índice da tab ativa:', this.selectedIndex);
  }

  addProduct = (product:Product) => {


    this.cart.putProductInCart(product)
    this.toast.success(`+${product.name}`)

  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((parms) => {
      this.category = parms.get('category');
      console.log(this.category.params.category);
    });

    forkJoin({
      products: this.api.getProducts(),
      categories: this.api.getCategories(),
    }).subscribe((results) => {
      this.products = results.products;
      this.categories = results.categories;

      //incere a categoria todos na array
      const addTodos = [{ name: 'Todos' }, ...this.categories];
      console.log(addTodos);

      //cria uma nova array incerrindo um novo objeto com os valores ja filtrados
      const newArray = addTodos.map((categoria: Categories) => {
        //filtra os produtos onde o id é o mesmo, adição de um ternario para todos os produtos
        const filtered = this.products?.filter((product) =>
          categoria.name === 'Todos'
            ? product
            : product.category_id === categoria.id
        );

        //retorna a array com os valores de acordo com a categoria
        return {
          ...categoria,
          products: filtered,
        };
      });

      this.categories = newArray;
      console.log(newArray);
    });
  }
}
