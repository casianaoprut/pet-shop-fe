import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Order} from "../shared/model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl + "/product";

  constructor(private http: HttpClient) { }

  public addOrder(order: Order){
    return this.http.post<Order>(
      this.apiUrl + "/product",
      {
        order
      }
    );
  }
}
