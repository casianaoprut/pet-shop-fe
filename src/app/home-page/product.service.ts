import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../shared/model/product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl + "/product";

  constructor(private http : HttpClient) { }

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl + "/all");
  }

  public getProduct(id: number): Observable<Product> {
     return this.http.get<Product>(this.apiUrl + `/${id}`);
  }
}
