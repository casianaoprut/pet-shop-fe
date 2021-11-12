import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../../shared/model/order.model";
import {OrderService} from "../order.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.css']
})
export class UserOrderListComponent implements OnInit, OnDestroy {

  orderList: Order[] = [];

  orderSubscription = new Subscription();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.getUserOrders().subscribe( orderList => {
      console.log(orderList);
      if(orderList != null){
        this.orderList = orderList;
      }
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
