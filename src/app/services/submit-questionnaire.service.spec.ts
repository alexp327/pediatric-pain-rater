import { TestBed } from '@angular/core/testing';

import { SubmitQuestionnaireService } from './submit-questionnaire.service';

describe('SubmitQuestionnaireService', () => {
  let service: SubmitQuestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitQuestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
