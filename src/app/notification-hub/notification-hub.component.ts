import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface notificationHubModal {
  notifications;
}

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.css']
})
export class NotificationHubComponent extends DialogComponent<notificationHubModal, boolean> implements notificationHubModal, OnInit {

  notifications;

  constructor(public dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  confirm() {
    this.result = true;
    this.close();
  }

}
