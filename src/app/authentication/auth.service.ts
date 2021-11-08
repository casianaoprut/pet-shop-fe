import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponseData} from "../shared/model/auth-response-data.model";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../shared/model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_KEY = "userData";

  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) { }

  public createAccount(username: string, password: string): Observable<AuthResponseData>{
    console.log(password, username);
    return this.http.post<AuthResponseData>(
      "http://localhost:8080/user/create",
      {
        username: username,
        password: password
      }).pipe(
        tap(respData => {
        // this.handleUsers({
        //   username: respData.username,
        //   role: respData.role
        //   });
          console.log(respData);
        })
      );
  }

  public login(username: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(
      "http://localhost:8080/user/login",
      {
        username: username,
        password: password
      }).pipe(
        tap(respData => {
            this.handleUsers({
              username: respData.username,
              role: respData.role
            });
          }
        )
      );
  }

  public logout(){
    this.user.next(null);
    localStorage.removeItem(this.USER_KEY);
  }

  private handleUsers(user: User){
    this.user.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
