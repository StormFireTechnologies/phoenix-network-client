import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  domain: any;

  constructor(public login: LoginService) { }

  ngOnInit() {
    if (this.login.gamerProfile) {
      this.domain = this.login.gamerProfile;
    } else {
      this.login.getProfile((err, profile) => {
        this.domain = profile;
      });
    }
  }

}
