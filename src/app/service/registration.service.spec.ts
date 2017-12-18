import {inject, TestBed} from '@angular/core/testing';

import {RegistrationService} from './registration.service';
import {ConnectionBackend, Http, HttpModule} from "@angular/http";

describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RegistrationService, Http, ConnectionBackend]
    });
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
