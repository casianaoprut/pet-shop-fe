import {Product} from "./product.model";

export interface CartElement {
  product: Product,
  quantity: number
}
