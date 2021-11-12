import {OrderPart} from "./order-part.model";

export interface Order {
  status?: string,
  username?: string,
  orderPartViews: OrderPart[];
}
