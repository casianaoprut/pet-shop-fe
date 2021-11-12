import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../shared/model/product.model";
import {Subscription} from "rxjs";
import {CartService} from "../cart/cart.service";
import {CartElement} from "../shared/model/cart-element.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  productList:Product[] = [];

  productSubscription = new Subscription();

  isCartEmpty = true;

  cartQuantity = 1;

  constructor(private productService: ProductService,
              private cartService: CartService
              ) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe( elem => {
      this.productList = elem;
      }
    );
    this.cartService.cartListSubject.subscribe(cartList => {
      this.isCartEmpty = cartList.length == 0;
      this.cartQuantity = this.getCartQuantity(cartList);
    });
  }

  private getCartQuantity(cart: CartElement[]): number{
    let quantity = 0;
    cart.forEach((elem) => quantity = quantity + elem.quantity);
    return quantity;
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}

@Component({
  selector: 'added-to-cart-dialog',
  templateUrl: 'added-to-cart-dialog.html',
})
export class AddedToCartDialog {}
