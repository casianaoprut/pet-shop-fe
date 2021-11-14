import {OrderPart} from "./order-part.model";

export interface Order{
  id?: number;
  status?: string;
  username?: string;
  date?: Date;
  price?: number;
  orderPartList: OrderPart[];
}
