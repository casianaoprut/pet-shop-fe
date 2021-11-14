import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Order} from "../shared/model/order.model";
import {BehaviorSubject, Observable} from "rxjs";
import {OrderPart} from "../shared/model/order-part.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl + "/order";

  orderPartListSubject = new BehaviorSubject<OrderPart[]>([]);

  constructor(private http: HttpClient) { }

  public addOrder(order: Order){
    console.log(order);
    return this.http.post<Order>(
      this.apiUrl + "/add",
      {
        orderPartList: order.orderPartList
      }
    );
  }

  public getUserOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl + "/user-orders" );
  }

  public getOrders(){
    return this.http.get<Order[]>(this.apiUrl + "/all");
  }

  public getOrderById(id: number): Observable<Order>{
    return this.http.get<Order>(this.apiUrl + `/${id}`);
  }

  public changeStatus(id: number, status: string){
    return this.http.put<Order>(this.apiUrl + `/change-status/${status}/${id}`, {});
  }

}
