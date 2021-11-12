import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Order} from "../shared/model/order.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl + "/order";

  constructor(private http: HttpClient) { }

  public addOrder(order: Order){
    return this.http.post<Order>(
      this.apiUrl + "/add",
      {
        orderPartViews: order.orderParts
      }
    );
  }

  public getUserOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl + "/user-orders" );
  }
}
