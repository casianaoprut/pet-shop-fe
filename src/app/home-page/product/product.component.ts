import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/model/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: Product;

  showDetails = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleDetails(){
    this.showDetails = !this.showDetails;
  }

}
