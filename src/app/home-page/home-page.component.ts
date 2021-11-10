import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../shared/model/product.model";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  productList:Product[] = [];

  productSubscription = new Subscription();

  constructor(private productService: ProductService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe( elem => {
      this.productList = elem;
      }
    )
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  public openDialog() {
     this.dialog.open(AddedToCartDialog);
  }

}

@Component({
  selector: 'added-to-cart-dialog',
  templateUrl: 'added-to-cart-dialog.html',
})
export class AddedToCartDialog {}
