import {inject, TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authenticatoion.service';
import {ConnectionBackend, Http, HttpModule} from "@angular/http";

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AuthenticationService, Http, ConnectionBackend]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
