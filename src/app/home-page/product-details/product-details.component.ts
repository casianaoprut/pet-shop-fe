import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../shared/model/product.model";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input()
  product!: Product;

  @Output()
  closeDetails = new EventEmitter<void>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeDetails.emit();
  }

  checkStock(value: string) {
    const number = +value;
    return this.product.stock < number;
  }

  addToCart(value: string) {
    this.cartService.addProductToCart(this.product, +value);
  }
}
