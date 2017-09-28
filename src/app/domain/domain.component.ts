import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NotificationHubComponent } from '../notification-hub/notification-hub.component';
import { DialogService } from 'ng2-bootstrap-modal';

const gamer = gql`
  query gamer($id: String!) {
    gamer(id: $id) {
      id
      username
      domainPic
      isNewGamer
    }
  }
`;

interface QueryResponse {
  id
  username
  domainPic
  isNewGamer
}

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
})
export class DomainComponent implements OnInit {

  incomeData: any;
  domain: any;
  gamerProfile: any;

  constructor(public login: LoginService, public apollo: Apollo, public dialogService: DialogService) {}

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.login.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.gamerProfile = profile;
        return this.getGamer(self.gamerProfile);
      }
    });
  }

  getGamer(gamerProfile) {
    this.apollo.watchQuery<QueryResponse>({
      query: gamer,
      variables: {
        id: this.gamerProfile.sub
      }
    }).subscribe(({data}) => {
      this.incomeData = data;
      this.domain = {
        id: this.incomeData.gamer.id,
        username: this.incomeData.gamer.username,
        domainPic: this.incomeData.gamer.domainPic,
        isNewGamer: this.incomeData.gamer.isNewGamer,
      };
    });
  }

  showNotificationHub() {
    let disposable = this.dialogService.addDialog(NotificationHubComponent, {}, {
      closeByClickingOutside: true
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          console.log('good for you');
        } else {
          console.log('well then');
        }
      });
  }
}
