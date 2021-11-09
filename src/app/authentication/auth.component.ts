import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signInMode = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeMode() {
    this.signInMode = !this.signInMode;
  }
}
