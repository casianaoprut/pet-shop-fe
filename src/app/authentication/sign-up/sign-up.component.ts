import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm) {
    if(!form.valid){
      return;
    }
    console.log("From onSubmit" + form.value.password);
    this.authService.createAccount(form.value.username, form.value.password)
                    .subscribe(() => {
      this.router.navigate(["/home-page"]).then();
    }, errorMessage => {
      console.log(errorMessage);
    });
  }

}
