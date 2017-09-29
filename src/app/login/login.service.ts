import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class LoginService {
  loginViewer = gql`
    mutation loginGamer($login: String!) {
      loginGamer(login: $login)
    }
  `;

  auth0 = new auth0.WebAuth({
     clientID: 'IIofmCiOFCYNNyTuqg40K5ClB1r9GEhU',
     domain: 'sftech.auth0.com',
     responseType: 'token id_token',
     audience: 'https://sftech.auth0.com/userinfo',
     redirectUri: 'http://localhost:4200/callback',
     scope: 'openid profile'
 });

  constructor(public router: Router, public apollo: Apollo) {}

  public login(): void {
     this.auth0.authorize();
  }

   public handleAuthentication(): void {
     this.auth0.parseHash((err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         window.location.hash = '';
         this.setSession(authResult);
         this.getProfile((err, profile) => {
           this.gamerProfile = profile
         });
         this.router.navigate(['/domain/${authResult.id_token}']);
       } else if (err) {
         this.router.navigate(['/']);
         console.log(err);
       }
     });
   }

   gamerProfile: any;

   private setSession(authResult): void {
     // Set the time that the access token will expire at
     const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
     localStorage.setItem('access_token', authResult.accessToken);
     localStorage.setItem('id_token', authResult.idToken);
     localStorage.setItem('expires_at', expiresAt);
   }

   public logout(): void {
     // Remove tokens and expiry time from localStorage
     localStorage.removeItem('access_token');
     localStorage.removeItem('id_token');
     localStorage.removeItem('expires_at');
     // Go back to the welcome page
     this.router.navigate(['/']);
   }

   public isAuthenticated(): boolean {
     // Check wether the current time is past the access token's expiry time
     const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
     return new Date().getTime() < expiresAt;
   }

   public getProfile(cb): void {
     const accessToken = localStorage.getItem('access_token');
     if (!accessToken) {
       throw new Error('Access token must exist to fetch profile');
     }

     const self =this;
     this.auth0.client.userInfo(accessToken, (err, profile) => {
       if (profile) {
         self.gamerProfile = profile;
         this.apollo.mutate({
           mutation: this.loginViewer,
           variables: {
             login: accessToken
           }
         }).subscribe(({data}) => {
           console.log('Sent data: ', data);
         }, (error) => {
           console.log('There was an error sending the access token: ', error);
         });
       }
       cb(err, profile);
     });
   }
}
