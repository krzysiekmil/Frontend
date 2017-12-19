import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {AdminComponent} from './admin.component';
import {DataService} from "../service/data.service";
import {BaseRequestOptions, ConnectionBackend, HttpModule, ResponseOptions} from "@angular/http";
import {AuthenticationService} from "../service/authenticatoion.service";
import {MockBackend} from "@angular/http/testing";
import {City} from "../model/city";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/empty'

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>
  let mockbackend, service;
  let cityList: City[];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [AdminComponent],
      providers: [DataService, MockBackend, BaseRequestOptions
        , AdminComponent, AuthenticationService,
        {provide: ConnectionBackend, useClass: MockBackend},
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([DataService, ConnectionBackend], (_service, _mockbackend) => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    service = _service;
    cityList = component.cityList;
    mockbackend = _mockbackend;
    fixture.detectChanges();
  }));
  ;
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add city to cityList', () => {
    let city = new City();
    cityList.push(city);
    expect(cityList.length).toBe(1);

  });

  it('should delete city from cityList', () => {

  });
  it('should get city to cityList from server', () => {
    let response = [
      {
        "id": 25,
        "name": "Warszawa"
      },
      {
        "id": 26,
        "name": "Krakow"
      },
      {
        "id": 27,
        "name": "Gdansk"
      }
    ];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
    service.getCityList()
      .subscribe(res => {
        expect(res).toContain({'id': 25, "name": "Warszawa"})
        expect(res.length).toBe(3)
      })

  });
  it('should post new city  to server', () => {
    let spy = spyOn(service.addCity('Lodz'), 'add').and.callFake(res => {
      return Observable.empty();
    })
    component.addCity('Lodz');

  });
  it('should delete city from server', () => {

  });
});

