import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../../shared/model/order.model";
import {Subscription} from "rxjs";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy{

  orderList: Order[] = [];

  orderSubscription = new Subscription();

  updateStatusSubscription = new Subscription();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.getOrders().subscribe(orderList => {
      this.orderList = orderList;
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.updateStatusSubscription.unsubscribe();
  }

  onChangeStatus(order: Order,status: string) { // anunta schimbarea
    if(order.id != undefined) {
      this.updateStatusSubscription = this.orderService.changeStatus(order.id, status).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
