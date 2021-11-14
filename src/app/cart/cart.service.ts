import {Injectable} from '@angular/core';
import {Product} from "../shared/model/product.model";
import {CartElement} from "../shared/model/cart-element.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartKey = "cartData";

  cartListSubject = new BehaviorSubject<CartElement[]>([]);

  constructor() {
    this.cartListSubject.next(this.getCartElements());
  }

  public addProductToCart(product: Product, quantity: number): void{
    const cart: CartElement[] = localStorage.getItem(this.cartKey) != null ?
                                JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
    this.addElementToCart(cart, {product: product, quantity: quantity});
    this.cartListSubject.next(cart);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  private addElementToCart(cart: CartElement[], cartElement: CartElement): CartElement[]{
    const elemIndex = cart.findIndex((elem => elem.product.name == cartElement.product.name));
    elemIndex == -1? cart.push(cartElement) : cart[elemIndex] = {product: cartElement.product,
                                                                 quantity: cartElement.quantity + cart[elemIndex].quantity};
    return cart;
  }

  public updateCart(cart: CartElement[]): void{
    this.cartListSubject.next(cart);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  private getCartElements() : CartElement[]{
    return localStorage.getItem(this.cartKey) != null ? JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
  }


  public deleteProductFromCart(cartElement: CartElement): void {
    const cart: CartElement[] = localStorage.getItem(this.cartKey) != null ?
      JSON.parse(<string>localStorage.getItem(this.cartKey)) : [];
    const elemIndex = cart.findIndex((elem => elem.product.name == cartElement.product.name));
    if(elemIndex != -1){
      cart.splice(elemIndex,1);
      console.log(cart);
    }
    this.cartListSubject.next(cart);
    localStorage.setItem(this.cartKey,JSON.stringify(cart));
  }

  public emptyCart(): void {
    this.cartListSubject.next([]);
    localStorage.removeItem(this.cartKey);
  }

}
