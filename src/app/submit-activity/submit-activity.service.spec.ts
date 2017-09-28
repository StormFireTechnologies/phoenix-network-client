import { TestBed, inject } from '@angular/core/testing';

import { SubmitActivityService } from './submit-activity.service';

describe('SubmitActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitActivityService]
    });
  });

  it('should be created', inject([SubmitActivityService], (service: SubmitActivityService) => {
    expect(service).toBeTruthy();
  }));
});
