import { TestBed, inject } from '@angular/core/testing';

import { HeaderFormService } from './header-form.service';

describe('HeaderFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderFormService]
    });
  });

  it('should be created', inject([HeaderFormService], (service: HeaderFormService) => {
    expect(service).toBeTruthy();
  }));
});
