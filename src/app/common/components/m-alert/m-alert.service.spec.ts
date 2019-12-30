import { TestBed, inject } from '@angular/core/testing';

import { MAlertService } from './m-alert.service';

describe('MAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MAlertService]
    });
  });

  it('should be created', inject([MAlertService], (service: MAlertService) => {
    expect(service).toBeTruthy();
  }));
});
