import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ChartComponent} from './chart.component';
import {ChartsModule} from "ng2-charts";
import {DataService} from "../service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "../service/authenticatoion.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import {MockBackend} from "@angular/http/testing";

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule, HttpModule],
      declarations: [ChartComponent],
      providers: [DataService, Http,
        {provide: ConnectionBackend, useClass: MockBackend},
        AuthenticationService,
        {provide: ActivatedRoute, useValue: {'params': Observable.from([{'name': 'Warszawa'}])}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call server to get data', inject([DataService], (dataService) => {
    let spy = spyOn(dataService, 'getTempCity').and.returnValue(Observable.empty());
    component.getCityData('Lodz');
    expect(spy).toHaveBeenCalledWith('Lodz');
  }));
  it('should get data from server', inject([DataService], dataService => {
    let response = [[{"id": 2388, "name": "Warszawa", "time": "2017-12-22T10:42:54.141", "temp": "3"}, {
      "id": 2384,
      "name": "Warszawa",
      "time": "2017-12-21T14:27:43.390",
      "temp": "0"
    }, {"id": 2380, "name": "Warszawa", "time": "2017-12-21T13:08:47.231", "temp": "0"}]];
    spyOn(dataService, 'getTempCity').and.returnValue(Observable.from(response));
    component.getCityData('Warszawa');
    expect(component.currentCityData.length).toBe(3);
  }));
  it('should set temp to right array ', inject([DataService], dataService => {
    let response = [[{"id": 2388, "name": "Warszawa", "time": "2017-12-22T10:42:54.141", "temp": "3"}, {
      "id": 2384,
      "name": "Warszawa",
      "time": "2017-12-21T14:27:43.390",
      "temp": "0"
    }, {"id": 2380, "name": "Warszawa", "time": "2017-12-21T13:08:47.231", "temp": "0"}]];
    spyOn(dataService, 'getTempCity').and.returnValue(Observable.from(response));
    component.getCityData('Warszawa');
    expect(component.lineChartData.length).toBe(3);
  }));
  it('should set time to right array ', inject([DataService], dataService => {
    let response = [[{"id": 2388, "name": "Warszawa", "time": "2017-12-22T10:42:54.141", "temp": "3"}, {
      "id": 2384,
      "name": "Warszawa",
      "time": "2017-12-21T14:27:43.390",
      "temp": "0"
    }, {"id": 2380, "name": "Warszawa", "time": "2017-12-21T13:08:47.231", "temp": "0"}]];
    spyOn(dataService, 'getTempCity').and.returnValue(Observable.from(response));
    component.getCityData('Warszawa');
    expect(component.lineChartData.length).toBe(3);
    expect(component.lineChartData).toContain('0');
  }));
  it('should set last time and temp', inject([DataService], dataService => {
    let response = [[{"id": 2388, "name": "Warszawa", "time": "2017-12-22T10:42:54.141", "temp": "3"}, {
      "id": 2384,
      "name": "Warszawa",
      "time": "2017-12-21T14:27:43.390",
      "temp": "0"
    }, {"id": 2380, "name": "Warszawa", "time": "2017-12-21T13:08:47.231", "temp": "0"}]];
    spyOn(dataService, 'getTempCity').and.returnValue(Observable.from(response));
    component.getCityData('Warszawa');
    expect(component.tempLast).toContain('3');
    expect(component.timeLast).toContain('2017-12-22T10:42:54.141');
  }));
  it('should call server to get All temp', inject([DataService], dataService => {
    let spy = spyOn(dataService, 'getAllTemp').and.returnValue(Observable.empty());
    component.getAllTemp();
    expect(spy).toHaveBeenCalled();
  }));
  it('should get data for all city from server', inject([DataService], dataService => {
    let response = [[{"id": 1, "name": "Warszawa", "time": "2017-12-08T14:34:03.101", "temp": "5"}, {
      "id": 2,
      "name": "Warszawa",
      "time": "2017-12-08T14:37:45.467",
      "temp": "5"
    }, {"id": 3, "name": "Warszawa", "time": "2017-12-08T14:42:45.082", "temp": "5"}, {
      "id": 4,
      "name": "Krakow",
      "time": "2017-12-08T14:42:45.226",
      "temp": "3"
    }]];
    spyOn(dataService, 'getAllTemp').and.returnValue(Observable.from(response));
    component.getAllTemp();
    expect(component.currentCityData.length).toBeGreaterThan(0);
  }));
  it('should call server to get cityList', inject([DataService], dataService => {
    let spy = spyOn(dataService, 'getCityList').and.returnValue(Observable.empty());
    component.getCity();
    expect(spy).toHaveBeenCalled();
  }));
  it('should call server to refresh data', inject([DataService], dataService => {
    let spy = spyOn(dataService, 'refreshData').and.returnValue(Observable.empty());
    component.refresh();
    expect(spy).toHaveBeenCalled();
  }));
  it('should route param change after run')


});
