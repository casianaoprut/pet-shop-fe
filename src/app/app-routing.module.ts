import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthComponent} from "./authentication/auth.component";
import {CartComponent} from "./cart/cart.component";
import {UserOrderListComponent} from "./order/user-order-list/user-order-list.component";

const routes: Routes = [
  {path: "", redirectTo:"home-page", pathMatch: "full"},
  {path: "home-page", component: HomePageComponent},
  {path: "authentication", component: AuthComponent},
  {path: "cart", component: CartComponent},
  {path: "my-orders", component: UserOrderListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
