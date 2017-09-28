import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface confirmModal {
  challenge: any;
}

@Component({
  selector: 'app-challenge-creation',
  templateUrl: './challenge-creation.component.html',
  styleUrls: ['../domain/domain.component.css', './challenge-creation.component.css']
})
export class ChallengeCreationComponent extends DialogComponent<confirmModal, boolean> implements confirmModal, OnInit {

  challenge: any;

  constructor(public dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  confirm() {
    this.result = true;
    this.close();
  }

  createChallenge(challengeForm) {
    console.log(challengeForm.value);
  }

}
