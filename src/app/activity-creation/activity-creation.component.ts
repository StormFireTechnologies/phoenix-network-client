import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { SubmitActivityService } from '../submit-activity/submit-activity.service';
import { DomainComponent } from '../domain/domain.component';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


export interface confirmActivityModal {
  activity: any;
}

@Component({
  selector: 'activity-creation',
  templateUrl: './activity-creation.component.html',
  styleUrls: ['./activity-creation.component.css'],
  providers: [SubmitActivityService]
})

export class ActivityCreationComponent extends DialogComponent<confirmActivityModal, boolean> implements confirmActivityModal, OnInit {

  activity;
  activityType = 'post';
  uuid = UUID.UUID();

  imgOptions: FancyImageUploaderOptions = {
    thumbnailHeight: 100,
    thumbnailWidth: 100,
    uploadUrl: 'http://localhost:8080/graph',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
  };


  constructor(private submitActivityService: SubmitActivityService, public dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  setPostType($event) {
    this.activityType = $event.target.id;
  }

  onUpload(file: UploadedFile) {
    console.log(file);
  }

  addActivity(activityForm) {
    // Need to add a toggle for the activity creation modal
    // activityForm.value will display the value of the form data
    // Takes in form data and sends it over to the db to be saved
    this.activity = {
      content: activityForm.value.content,
      createdAt: Date(),
      activityType: this.activityType,
      activityId: this.uuid,
      votes: 0,
      creator: "auth0|597d8e5a497425796a831983",
    };

    this.submitActivityService.submitActivity(this.activity).subscribe(({ data }) => {
      console.log('Got data: ', data);
    }, (error) => {
      console.log('There was an error sending the mutation: ', error);
    });
  }

  confirm() {
    this.result = true;
    this.close();
  }

  public openPopup: Function;

  setPopupAction(fn: any) {
    this.openPopup = fn;
  }

}
