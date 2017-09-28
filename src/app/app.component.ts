import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
  })
export class AppComponent {
  title = 'Phoenix Network';

  constructor(public auth: LoginService) {
    auth.handleAuthentication();
  }
}
