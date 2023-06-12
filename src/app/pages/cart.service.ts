
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './types/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor( ) {
    this.loadProduct();
  }

  cartProducts: Product[] = [];

  private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  
  public cartProducts$ = this.cartProductsSubject.asObservable();


  private stake(products: Product[]): void {
    localStorage.setItem('cart', JSON.stringify(products));
  }

  private loadProduct(): void {
    const cartInfo: string | null = localStorage.getItem('cart');
    if (cartInfo) {
      this.cartProductsSubject.next(JSON.parse(cartInfo));
    }
  }

  public putProductInCart(product: Product) {
    const currentCartProduct = this.cartProductsSubject.value;
    const cartIndex = currentCartProduct.findIndex(
      (prod) => prod.id === product.id
    );

    if (cartIndex >= 0) {
      currentCartProduct[cartIndex].quantity += +1;
      this.cartProductsSubject.next(currentCartProduct);

    } else {
      product.quantity = 1;
      const newCartProducts = [...currentCartProduct, product];
      this.cartProductsSubject.next(newCartProducts);
    }
    this.stake(this.cartProductsSubject.value);
  }

  public removeProduct(product: Product) {

    //valor atual da minha array
    const currentCartProducts = this.cartProductsSubject.value;

    //achando o index do produto
    const cartIndex = currentCartProducts.findIndex(
      (pd) => pd.id === product.id
    );

    //incerindo o index enviado para a array atual para verificar a quantidade
    if (currentCartProducts[cartIndex].quantity > 1) {

      //se a quantidade for maior que 1 faz um map onde retorna -1 caso os id sejam iguais ou retorna a quantidade normal
      const newCart = currentCartProducts.map((prod) =>
        prod.id === product.id
          ? { ...product, quantity: product.quantity - 1 }
          : prod
      );

      //atribui um novo valor para o subject
      this.cartProductsSubject.next(newCart);
      this.stake(newCart);
    } else {
      this.deleteProduct(product);
    }
  }

  public plusProduct(product: Product) {
    const currentCartProducts = this.cartProductsSubject.value;

    const newCart = currentCartProducts.map((item) =>
      item.id === product.id ? { ...item, quantity: product.quantity + 1 } : item
    );
    this.stake(newCart);
    this.cartProductsSubject.next(newCart);
  }

  public deleteProduct(product: Product) {
    const currentCartProducts = this.cartProductsSubject.value;
    const newCart = currentCartProducts.filter(
      (item) => item.id !== product.id
    );
    this.stake(newCart);
    this.cartProductsSubject.next(newCart);
  }

  public index(){
    return this.cartProductsSubject.value
  }
}
