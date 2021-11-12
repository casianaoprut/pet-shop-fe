import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {CartElement} from "../shared/model/cart-element.model";
import {OrderPart} from "../shared/model/order-part.model";
import {OrderService} from "../order/order.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartChecked = true;

  cart: CartElement[] = [];

  cartSubscription = new Subscription();

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(){
    this.cartSubscription = this.cartService.cartListSubject.subscribe( cartList => {
        this.cart = cartList;
        cartList.forEach(elem => {
          this.cartChecked = elem.quantity <= elem.product.stock && elem.quantity >= 1;
        })
    })
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  onDelete(cartElement: CartElement) {
    this.cartService.deleteProductFromCart(cartElement);
  }

  onUpdateCart() {
    this.cartService.updateCart(this.cart);
  }

  getPrice(){
    let sum = 0;
    this.cart.forEach(elem => sum = sum + (elem.product.price * elem.quantity));
    return sum;
  }

  onPlaceOrder() {
    const orderParts: OrderPart[] = this.cart.map(elem => {
        return {
          productId: elem.product.id,
          quantity: elem.quantity
        };
      }
    );
    this.orderService.addOrder({
      orderParts: orderParts
    });
    this.cartService.emptyCart();
    this.router.navigate(["/my-orders"]).then(() =>{});
  }

  public checkStock(cartElement: CartElement) {
    return cartElement.quantity <= cartElement.product.stock;
  }

  public checkNumber(quantity: number) {
    return quantity >= 1;
  }
}
