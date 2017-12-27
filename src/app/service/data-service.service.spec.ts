import {inject, TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import "rxjs/add/observable/of";
import {AuthenticationService} from "./authenticatoion.service";
import {MockBackend} from "@angular/http/testing";

describe('DataService', () => {
  let mockbackend, service;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DataService,
        Http,
        AuthenticationService,
        {provide: ConnectionBackend, useClass: MockBackend},
        // {provide: RequestOptions, useValue: [HTTP.STATUS_CODES]},
      ]
    });
  });
  beforeEach(inject([DataService, ConnectionBackend], (_service, _mockbackend) => {
    service = _service;
    mockbackend = _mockbackend;
  }));

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
  it('should return value true of code', inject([DataService], (service: DataService) => {
    service.setcode(true);
    expect(service.getcode()).toBe(true);
  }));
  it('should set code', inject([DataService], (service: DataService) => {
    service.setcode(true);
    expect(service._code).toBe(true);
  }));
  it('should return value true of state', inject([DataService], (service: DataService) => {
    service.setState(true);
    expect(service.getState()).toBe(true);
  }));
  it('should set state', inject([DataService], (service: DataService) => {
    service.setState(true);
    expect(service.state).toBe(true);
  }));
  it('get OK respond after delete city', inject([DataService, ConnectionBackend], (service, mock) => {
    mock.connections.subscribe(con => {
      con.mockRespond(new Response()
      )
    });
    service.deleteCity('Warszawa').subscribe(x => {
      expect(x).toEqual(200);
    })
  }));
  it('get OK respond after delete city', inject([DataService, ConnectionBackend], (service, mock) => {
    mock.connections.subscribe(con => {
      con.mockRespond({status: 400})
    });
    service.deleteCity('Warszawa').subscribe(x => {
      expect(x).toEqual(400);
    });
  }));
});
