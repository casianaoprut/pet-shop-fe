import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../home-page/product.service";
import {Product} from "../../../shared/model/product.model";
import {ActivatedRoute, Params} from "@angular/router";
import {OrderService} from "../../order.service";
import {Order} from "../../../shared/model/order.model";
import {Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit, OnDestroy {

  order: Order | null = null;

  productList: Product[] = [];

  idList = "";

  paramsSubscription = new Subscription();

  orderSubscription = new Subscription();

  productListSubscription = new Subscription();

  photoUrl = environment.apiUrl + "/product/photo/";

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.orderSubscription = this.orderService.getOrderById(+params.id).subscribe( order => {
        this.order = order;
        this.order.orderPartList.forEach(orderPart => this.idList = this.idList + orderPart.productId + ",");
        this.idList = this.idList.slice(0,this.idList.length-1);
        this.productListSubscription =
          this.productService.getProductListByIdList(this.idList)
                             .subscribe( productList => { this.productList = productList; });
        });
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.productListSubscription.unsubscribe();
  }

  public findQuantity(productId: number): number{
    const product = this.order?.orderPartList.find(elem => elem.productId = productId);
    if(product != undefined && product.quantity) {
      return product.quantity;
    }
    return 0;
  }
}
