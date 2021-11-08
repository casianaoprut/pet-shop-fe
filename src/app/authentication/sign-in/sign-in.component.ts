import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm) {
    if (!form.valid){
      return;
    }
    this.authService.login(form.value.username, form.value.password)
                    .subscribe( () => {
      this.router.navigate(["/home-page"]);
    }, errorMessage => {
      console.log(errorMessage);
    });
  }
}
