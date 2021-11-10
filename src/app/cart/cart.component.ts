import { Component, OnInit } from '@angular/core';
import {CartService} from "./cart.service";
import {CartElement} from "../shared/model/cart-element.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartElement[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.cart = this.cartService.getCartProducts();
  }

}
