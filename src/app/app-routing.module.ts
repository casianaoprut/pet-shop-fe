import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {AuthComponent} from "./authentication/auth.component";

const routes: Routes = [
  {path: "", redirectTo:"home-page", pathMatch: "full"},
  {path: "home-page", component: HomePageComponent}
];
const routes: Routes = [
  {path: 'authentication', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
