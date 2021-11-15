import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../shared/model/product.model";
import {Subscription} from "rxjs";
import {CartService} from "../cart/cart.service";
import {CartElement} from "../shared/model/cart-element.model";
import {AuthService} from "../authentication/auth.service";
import {User} from "../shared/model/user";
import {Filter} from "../shared/model/filter.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  productList:Product[] = [];

  productSubscription = new Subscription();

  filterSubscription = new Subscription();

  refreshSubscription = new Subscription();

  isCartEmpty = true;

  cartQuantity = 1;

  cartSubscription = new Subscription();

  editMode = false;

  user: User | null = null;

  userSubscription = new Subscription();

  showEditor = false;

  showFillers = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe( elem => {
      this.productList = elem;
      }
    );
    this.cartSubscription= this.cartService.cartListSubject.subscribe(cartList => {
      this.isCartEmpty = cartList.length == 0;
      this.cartQuantity = this.getCartQuantity(cartList);
    });
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  private getCartQuantity(cart: CartElement[]): number{
    let quantity = 0;
    cart.forEach((elem) => quantity = quantity + elem.quantity);
    return quantity;
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
  }

  public onHandleEditMode() {
    this.editMode = !this.editMode;
  }

  public handleEditor() {
    this.showEditor = !this.showEditor;
  }

  public handleFilters() {
    this.showFillers = !this.showFillers;
  }

  public applyFilters($event: Filter) {
    this.filterSubscription = this.productService.getFilteredProducts($event).subscribe( filteredList => {
      this.productList = filteredList;
    })
  }

  public refreshTheList() {
    this.refreshSubscription = this.productService.getAllProducts().subscribe(productList => {
      this.productList = productList;
    });
  }
}
