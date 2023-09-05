import { TestBed } from '@angular/core/testing';

import { SubmitMetadataService } from './submit-metadata.service';

describe('SubmitMetadataService', () => {
  let service: SubmitMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
