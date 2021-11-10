import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../shared/model/product.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  productList:Product[] = [];

  productSubscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe( elem => {
      this.productList = elem;
      }
    )
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}
