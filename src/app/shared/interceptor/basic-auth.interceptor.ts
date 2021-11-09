import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../authentication/auth.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authService.getUserValue();
    const isLoggedIn = user && user.authData;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    const isPublicUrl = request.url.endsWith("/product/all") ||
                        request.url.endsWith("/product/filter") ||
                        request.url.endsWith("/user/create");
    if(isLoggedIn && isApiUrl && !isPublicUrl){
      request = request.clone({
        setHeaders: {
          Authorization:`Basic ${user?.authData}`
        }
      });
    }
    return next.handle(request);
  }
}
