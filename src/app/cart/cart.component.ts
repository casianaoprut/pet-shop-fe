import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {CartElement} from "../shared/model/cart-element.model";
import {OrderPart} from "../shared/model/order-part.model";
import {OrderService} from "../order/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartElement[] = [];

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(){
    this.cart = this.cartService.getCartProducts();
  }

  onDelete(cartElement: CartElement) {
    this.cartService.deleteProductFromCart(cartElement);
    window.location.reload();
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
      orderPartViews: orderParts
    });
    this.cartService.emptyCart();
    this.router.navigate(["/my-orders"]).then(() =>{});
  }
}
