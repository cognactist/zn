import { TestBed, inject } from '@angular/core/testing';

import { FormAlertService } from './form-alert.service';

describe('FormAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormAlertService]
    });
  });

  it('should be created', inject([FormAlertService], (service: FormAlertService) => {
    expect(service).toBeTruthy();
  }));
});
