import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularWormholeModule } from 'angular-wormhole';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { EmojiPickerModule } from 'ng-emoji-picker';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { DomainComponent } from './domain/domain.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { ActivitySearchComponent } from './activity-search/activity-search.component';
import { ChallengeSearchComponent } from './challenge-search/challenge-search.component';
import { ChallengeCreationComponent } from './challenge-creation/challenge-creation.component';
import { FriendsComponent } from './friends/friends.component';
import { ActivityCreationComponent } from './activity-creation/activity-creation.component';
import { FriendSearchComponent } from './friend-search/friend-search.component';
import { NotificationHubComponent } from './notification-hub/notification-hub.component';

const appRoutes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'domain/:id', component: DomainComponent },
  { path: 'callback',   component: CallbackComponent }
];

/*
const networkInterface = createNetworkInterface('http://localhost:8080/graph');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    req.options.headers.authorization = localStorage.getItem('id_token') || null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});
*/

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8080/graph'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    DomainComponent,
    PageNotFoundComponent,
    ChallengesComponent,
    ActivityFeedComponent,
    ActivitySearchComponent,
    ChallengeSearchComponent,
    ChallengeCreationComponent,
    FriendsComponent,
    ActivityCreationComponent,
    FriendSearchComponent,
    NotificationHubComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularWormholeModule,
    ApolloModule.forRoot(provideClient),
    FormsModule,
    FancyImageUploaderModule,
    BootstrapModalModule,
    DateTimePickerModule,
    EmojiPickerModule
  ],
  entryComponents: [
    ActivityCreationComponent,
    NotificationHubComponent,
    ChallengeCreationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
