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
    this.addElementInCart(cart, {product: product, quantity: quantity});
    localStorage.setItem(this.cartKey,JSON.stringify(cart));
  }

  private addElementInCart(cart: CartElement[], cartElement: CartElement): CartElement[]{
    const elemIndex = cart.findIndex((elem => elem.product.name == cartElement.product.name));
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


  public deleteProductFromCart(cartElement: CartElement) {
    const cart: CartElement[] = localStorage.getItem(this.cartKey) != null ?
      JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
    const elemIndex = cart.findIndex((elem => elem.product.name == cartElement.product.name));
    if(elemIndex != -1){
      cart.splice(elemIndex,1);
      console.log(cart);
    }

    localStorage.setItem(this.cartKey,JSON.stringify(cart));
  }
}
