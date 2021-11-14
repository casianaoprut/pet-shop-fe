import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from "../../shared/model/product.model";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../product.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input()
  product!: Product;

  @Input()
  editMode!: boolean;

  @Output()
  openDialog = new EventEmitter<void>();

  showDetails = false;

  photoUrl = "";

  productDeleteSubscription = new Subscription();
  showEditor = false;

  constructor(private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.photoUrl = environment.apiUrl + `/product/photo/${this.product.id}`;
  }

  ngOnDestroy(): void{
    this.productDeleteSubscription.unsubscribe();
  }

  handleDetails(){
    this.showDetails = !this.showDetails;
  }

  onAddToCart() {
    this.cartService.addProductToCart(this.product, 1);
    this.openDialog.emit();
  }

  public onDelete() {
    if(this.product.id)
    this.productService.deleteProduct(this.product.id).subscribe();
  }

  public handleEditor() {
    this.showEditor = !this.showEditor;
  }
}
