import { Component, OnInit } from '@angular/core';
import { ChallengeCreationComponent } from '../challenge-creation/challenge-creation.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['../domain/domain.component.css', './challenges.component.css']
})
export class ChallengesComponent implements OnInit {

  constructor(public dialogService: DialogService) {}

  ngOnInit() {
  }

  openChallengeCreation() {
    let disposable = this.dialogService.addDialog(ChallengeCreationComponent, {}, {
      closeByClickingOutside: true
    });
  }

}
