import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class SubmitActivityService {
  mutation = gql`
    mutation submitActivity($activity: ActivityInput!) {
      submitActivity(activity: $activity) {
        content
        createdAt
        activityType
        activityId
        creator
      }
    }`;

  constructor(public apollo: Apollo) {}


  submitActivity(activity: string) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        activity: activity
      }
    });
  }
}
