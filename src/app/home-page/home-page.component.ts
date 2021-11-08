import { Component, OnInit } from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../shared/model/product.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  productList:Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe( elem => {
      this.productList = elem;
      }
    )
  }

}
