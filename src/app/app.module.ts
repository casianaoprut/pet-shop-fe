import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {PrimengModule} from "./primeng.module";
import {MaterialModule} from "./material.module";

import {BasicAuthInterceptor} from "./shared/interceptor/basic-auth.interceptor";
import {ErrorInterceptor} from "./shared/interceptor/error.interceptor";

import { AppComponent } from './app.component';
import { AuthComponent } from './authentication/auth.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductComponent } from './home-page/product/product.component';
import { ProductDetailsComponent } from './home-page/product-details/product-details.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductComponent,
    ProductDetailsComponent,
    SignUpComponent,
    SignInComponent,
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    PrimengModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
