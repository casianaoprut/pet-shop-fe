import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponseData} from "../shared/model/auth-response-data.model";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../shared/model/user";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_KEY = "userData";

  userSubject = new BehaviorSubject<User|null>(null);

  apiUrl = environment.apiUrl + "/user";

  constructor(private http: HttpClient,
              private router: Router) {
    if (localStorage.getItem(this.USER_KEY) != null){
      this.userSubject = new BehaviorSubject<User | null>(JSON.parse(<string>localStorage.getItem(this.USER_KEY)));
    }
  }

  public createAccount(username: string, password: string): Observable<AuthResponseData>{
    const authData = window.btoa(username+ ":" + password);
    return this.http.post<AuthResponseData>(
      this.apiUrl + "/create",
      {
        userName: username,
        password: password
      }).pipe(
        tap(user => {
          this.handleUsers({
            userName: user.username,
            role: user.role,
            authData: authData
          });
        })
      );
  }

  public login(username: string, password: string): Observable<AuthResponseData>{
    const authData = window.btoa(username+ ":" + password);
    this.handleUsers({
      userName: username,
      authData: authData
    });
    return this.http.get<AuthResponseData>(this.apiUrl + "/login").pipe(
      map(user => {
        const myUser = {
          ...user,
          authData: authData
        }
        this.handleUsers(myUser);
        return myUser;
      })
    );
  }

  public logout(): void{
    this.userSubject.next(null);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(["/authentication"]);
  }

  private handleUsers(user: User): void{
    this.userSubject.next(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUserValue(): User|null{
    return this.userSubject.value;
  }
}
