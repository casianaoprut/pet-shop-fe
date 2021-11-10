import {Injectable} from '@angular/core';
import {Product} from "../shared/model/product.model";
import {CartElement} from "../shared/model/cart-element.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartKey = "cartKey";

  constructor() { }

  public addProductToCart(product: Product, quantity: number): void{
    const cart: CartElement[] = localStorage.getItem(this.cartKey) != null ?
                                JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
    cart.push({
      product: product,
      quantity: quantity
    });
    localStorage.setItem(this.cartKey,JSON.stringify(cart));
  }

  public getCartProducts(): CartElement[]{
    return localStorage.getItem(this.cartKey) != null ? JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
  }

  public updateCart(cart: CartElement[]): void{
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }


}
