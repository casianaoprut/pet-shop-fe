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

  @Output()
  openDialog = new EventEmitter<void>();

  quantity = 1;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.closeDetails.emit();
  }

  checkStock() {
    return this.product.stock < this.quantity;
  }

  checkNumber(){
    if(this.quantity <1 || this.quantity == null) {
      return true;
    }
    return false;
  }

  addToCart() {
    this.cartService.addProductToCart(this.product, this.quantity);
    this.openDialog.emit();
    this.closeDetails.emit();
  }
}
