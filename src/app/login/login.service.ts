import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min.js';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class LoginService {
  loginViewer = gql`
    mutation loginGamer($login: String!) {
      loginGamer(login: $login)
    }
  `;

  signIn = new OktaSignIn({
    baseUrl: 'https://.com',
    clientId: '',
    authParams: {
      issuer: 'https://.com/oauth2/',
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'profile']
    }
  });

  constructor(public router: Router, public apollo: Apollo) {}

  isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManager
    return !!this.signIn.tokenManager.get('accessToken');
  }

  login() {
    this.signIn.renderEl({ el: '#okta-signin-container' }, tokens => {
      tokens.forEach(token => {
        if (token.idToken) {
          this.signIn.tokenManager.add('idToken', token);
        }
        if (token.accessToken) {
          this.signIn.tokenManager.add('accessToken', token);
        }
        this.signIn.hide();
        this.apollo.mutate({
          mutation: this.loginViewer,
          variables: {
            login: token.accessToken,
          }
        }).subscribe(({ data }) => {
          console.log('Sent data: ', data);
          console.log(data[0]);
        }, (error) => {
          console.log('There was an error sending the access token: ', error);
        });
      });
    });
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens
    this.signIn.tokenManager.clear();
    await this.signIn.signOut();
    this.signIn.remove();
  }
}
