import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../shared/model/user";
import {AuthService} from "../authentication/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User|null = null;

  userSubscription = new Subscription();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  doLogout() {
    this.authService.logout();
  }

}
