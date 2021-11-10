import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../shared/model/product.model";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product!: Product;

  @Output()
  openDialog = new EventEmitter<void>();

  showDetails = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  handleDetails(){
    this.showDetails = !this.showDetails;
  }

  onAddToCart() {
    this.cartService.addProductToCart(this.product, 1);
    this.openDialog.emit();
  }

  onOpenDialog(){
    this.openDialog.emit();
  }
}
