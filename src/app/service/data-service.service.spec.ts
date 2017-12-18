import {inject, TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {ConnectionBackend, Http, HttpModule, RequestOptions} from "@angular/http";
import * as HTTP from "http";
import "rxjs/add/observable/of";
import {AuthenticationService} from "./authenticatoion.service";

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DataService,
        Http,
        AuthenticationService,
        ConnectionBackend,
        {provide: RequestOptions, useValue: [HTTP.METHODS]},
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
