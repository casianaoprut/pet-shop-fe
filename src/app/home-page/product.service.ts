import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../shared/model/product.model";
import {environment} from "../../environments/environment";
import {Filter} from "../shared/model/filter.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiUrl + "/product";

  constructor(private http : HttpClient) { }

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl + "/all");
  }

  public getProductListByIdList(idList: string): Observable<Product[]>{
    const params = new HttpParams().set("idList",idList);
    return this.http.get<Product[]>(this.apiUrl + `/get-by-id-list`,{params});
  }

  public deleteProduct(id: number){
    return this.http.delete(this.apiUrl + `/delete/${id}`);
  }

  public edit(product: Product): Observable<Product> {
    let productData = ProductService.createFormDataForProduct(product);
    return this.http.put<Product>(this.apiUrl + "/edit",
      productData);
  }

  public add(product: Product): Observable<Product> {
    let productData = ProductService.createFormDataForProduct(product);
    return this.http.post<Product>(this.apiUrl + "/add",
      productData);
  }

  private static createFormDataForProduct(product: Product){
    let productData = new FormData();
    if(product.id != undefined){
      productData.append('id', product.id.toString());
    }
    productData.append('description', product.description);
    productData.append('name', product.name);
    productData.append('forBreed', product.forBreed);
    productData.append('category', product.category);
    if (product.onSale) {
      productData.append('onSale', 'true');
    } else {
      productData.append('onSale', 'false');
    }
    if(product.stock != undefined) {
      productData.append('stock', product.stock.toString());
    }
    if(product.price != undefined) {
      productData.append('price', product.price.toString());
    }
    if(product.photo != undefined) {
      productData.append('photo', product.photo)
    }
    return productData;
  }

  public getFilteredProducts(filter: Filter): Observable<Product[]>{
    return this.http.post<Product[]>(this.apiUrl + "/filter", {
      ...filter
    });
  }
}
