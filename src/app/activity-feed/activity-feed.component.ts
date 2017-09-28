import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { UUID } from 'angular2-uuid';
import { ActivityCreationComponent } from '../activity-creation/activity-creation.component';
import { DialogService, DialogOptions } from 'ng2-bootstrap-modal';


const getActivity = gql`
  query activity($activityId: String!) {
    activity(activityId: $activityId) {
      activityId
      content
      createdAt
    }
  }
`;

const getActivities = gql`
  query gamer($id: String!) {
    gamer(id: $id) {
      id
      activities{
        activityId
        content
        createdAt
        likes {
          response
        }
        dislikes {
          response
        }
        comments {
          content
          commentor {
            username
            domainPic
          }
          timeCommented
        }
      }
    }
  }
`;

const deleteActivity = gql`
  mutation deleteActivity($activityId: String!) {
    deleteActivity(activityId: $activityId) {
      activityId
    }
  }
`;

const updateActivity = gql`
  mutation updateActivity($activityId: String!, $activity: UpdateActivityInput!) {
    updateActivity(activityId: $activityId, activity: $activity) {
      content
    }
  }
`;

const likeActivity = gql`
  mutation likeActivity($like: LikeInput!, $activityId: String!) {
    likeActivity(like: $like, activityId: $activityId) {
      id
      activityId
      response
      voter
      timeVoted
    }
  }
`;

const dislikeActivity = gql`
  mutation dislikeActivity($dislike: DislikeInput!, $activityId: String!) {
    dislikeActivity(dislike: $dislike, activityId: $activityId) {
      id
      activityId
      response
      voter
      timeVoted
    }
  }
`;

const commentActivity = gql`
  mutation commentActivity($comment: CommentInput!, $activityId: String!) {
    commentActivity(comment: $comment, activityId: $activityId) {
      id
      activityId
      content
      timeCommented
    }
  }
`;

interface QueryResponse {
  activityId
  content
  createdAt
  likes
  dislikes
  comments
}

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['../domain/domain.component.css', './activity-feed.component.css']
})

export class ActivityFeedComponent implements OnInit {

  activity;
  activityData;
  voteData;
  commentData;
  shareData;
  activities;
  isViewingComments: boolean = true;
  uuid = UUID.UUID();

  constructor(private apollo: Apollo, private dialogService: DialogService) {}

  ngOnInit() {
    this.apollo.watchQuery<QueryResponse>({
      query: getActivities,
      variables: {
        id: "auth0|597d8e5a497425796a831983"
      }
    }).subscribe(({ data }) => {
      this.activityData = data;
      console.log(this.activityData.gamer.activities);
      this.activities = this.activityData.gamer.activities;
      /*
      this.activity = {
        activityId: this.activityData.activity.activityId,
        content: this.activityData.activity.content,
        createdAt: this.activityData.activity.createdAt,
        votes: this.activityData.activity.votes,
      };
      */
    });
  }

  createActivity(activityType) {
    console.log(activityType);
    let disposable = this.dialogService.addDialog(ActivityCreationComponent, {}, {
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

  removeActivity(activityId) {
    // Takes the correct activity id and sends a DELETE request to remove the post
    return this.apollo.mutate({
      mutation: deleteActivity,
      variables: {
        activityId: activityId,
      }
    }).subscribe(({data}) => {
      console.log('Deleted data: ', data);
    }, (error) => {
      console.log('There was an error deleting the activity: ', error);
    });
  }

  updateActivity(activityId) {
    // Takes the current post/activity and updates the current information
    return this.apollo.mutate({
      mutation: updateActivity,
      variables: {
        activityId: activityId,
      }
    }).subscribe(({ data }) => {
      this.activityData = data;
      console.log(this.activityData);
      this.activity.content = "Hey there!";
    }, (error) => {
      console.log('There was an error updating the activity: ', error);
    });
  }

  activityPropagation() {
    // This propagates the activities from friends and displays it on the current gamer's activity feed

  }

  afkPool() {
    // This collects specific activities from friends and people they follow and present them to the gamer
    // when they log back into the Phoenix Network, a notification may also be sent to them
  }

  voteActivity(response, activityId) {
    return this.apollo.mutate({
      mutation: likeActivity,
      variables: {
        like: {
          id: this.uuid,
          activityId: activityId,
          response: response,
          voter: "auth0|597d8e5a497425796a831983",
          timeVoted: Date.now(),
        },
        activityId: activityId
      }
    }).subscribe(({data}) => {
      this.voteData = data;
      console.log(this.voteData);
      //this.activity.votes = this.voteData.like;
    }, (error) => {
      console.log('There was an error liking the activity: ', error);
    });

  }

  dislikeActivity(response, activityId) {
    return this.apollo.mutate({
      mutation: dislikeActivity,
      variables: {
        dislike: {
          id: this.uuid,
          activityId: activityId,
          response: response,
          voter: "auth0|597d8e5a497425796a831983",
          timeVoted: Date.now(),
        },
        activityId: activityId
      }
    }).subscribe(({data}) => {
      console.log(data);
    }, (error) => {
      console.log('There was an error disliking the activity: ', error);
    });
  }

  showComments(isViewingComments) {
    console.log(isViewingComments);
  }

  commentActivity(content, activityId) {
    return this.apollo.mutate({
      mutation: commentActivity,
      variables: {
        comment: {
          id: this.uuid,
          activityId: activityId,
          content: content.value.content,
          commentor: "auth0|597d8e5a497425796a831983",
          timeCommented: Date.now(),
        },
        activityId: activityId
      }
    }).subscribe(({data}) => {
      console.log(data);
    }, (error) => {
      console.log('There was an error commenting on the activity: ', error);
    });
  }

  shareActivity(activityId) {
    console.log(activityId);
  }

}
