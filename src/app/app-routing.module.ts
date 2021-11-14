import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthComponent} from "./authentication/auth.component";
import {CartComponent} from "./cart/cart.component";
import {UserOrderListComponent} from "./order/user-order-list/user-order-list.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {OrderItemComponent} from "./order/order-list/order-item/order-item.component";

const routes: Routes = [
  {path: "", redirectTo:"home-page", pathMatch: "full"},
  {path: "home-page", component: HomePageComponent},
  {path: "authentication", component: AuthComponent},
  {path: "cart", component: CartComponent, canActivate: [AuthGuard]},
  {path: "my-orders", component: UserOrderListComponent, canActivate: [AuthGuard]},
  {path: "manage-orders", component: OrderListComponent, canActivate:[AuthGuard]},
  {path: "manage-orders/:id", component: OrderItemComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
