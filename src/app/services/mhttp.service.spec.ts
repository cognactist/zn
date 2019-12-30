import { TestBed, inject } from '@angular/core/testing';

import { MhttpService } from './mhttp.service';

describe('MhttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MhttpService]
    });
  });

  it('should be created', inject([MhttpService], (service: MhttpService) => {
    expect(service).toBeTruthy();
  }));
});
