import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  login;

  constructor(private loginService: LoginService) {
    loginService.handleAuthentication();
  }

  ngOnInit() {
    this.login = this.loginService.login();
  }

}
