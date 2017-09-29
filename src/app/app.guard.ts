import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  signIn;
  authenticated;
  constructor(private okta: LoginService, private router: Router) {
    this.authenticated = okta.isAuthenticated()
    this.signIn = okta;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) { return true; }
    // Redirect to login flow
    this.signIn.login();
    return false;
  }
}
