import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { UUID } from 'angular2-uuid';

const createChallenge =gql`
  mutation createChallenge($challenge: ChallengeInput!) {
    createChallenge(challenge: $challenge) {
      id
    }
  }
`;

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
  uuid = UUID.UUID();

  constructor(public dialogService: DialogService, private apollo: Apollo) {
    super(dialogService);
  }

  ngOnInit() {
  }

  confirm() {
    this.result = true;
    this.close();
  }

  createChallenge(challengeForm) {
    return this.apollo.mutate({
      mutation: createChallenge,
      variables: {
        challenge: {
          id: this.uuid,
          title: challengeForm.value.title,
          game: challengeForm.value.game,
          creator: "auth0|597d8e5a497425796a831983",
          createdAt: Date.now(),
          timeStart: Date.now(),
          timeEnd: "1 hour",
          objective: challengeForm.value.objective,
          goal: challengeForm.value.goal,
          participants: challengeForm.value.participants,
          placements: challengeForm.value.placements,
          rewards: challengeForm.value.rewards,
        },
      },
    }).subscribe(({ data }) => {
      console.log(data);
    }, (error) => {
      console.log('There was an error creating the challenge: ', error);
    });
  }

}
