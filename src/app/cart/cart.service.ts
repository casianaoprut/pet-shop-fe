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
    this.updateElementInCart(cart, {product: product, quantity: quantity});
    localStorage.setItem(this.cartKey,JSON.stringify(cart));
  }

  private updateElementInCart(cart: CartElement[], cartElement: CartElement): CartElement[]{
    const elemIndex = cart.findIndex((elem => {
      console.log(elem.product.name);
      console.log(cartElement.product.name);
      return elem.product.name == cartElement.product.name
    }));
    elemIndex == -1? cart.push(cartElement) : cart[elemIndex] = {product: cartElement.product,
                                                                 quantity: cartElement.quantity + cart[elemIndex].quantity};
    return cart;
  }

  public getCartProducts(): CartElement[]{
    return localStorage.getItem(this.cartKey) != null ? JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
  }

  public updateCart(cart: CartElement[]): void{
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }


}
