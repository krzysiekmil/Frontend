import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {DataService} from "../service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "../service/authenticatoion.service";
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs/Observable";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [UserComponent],
      providers: [DataService,
        Http,
        {provide: ConnectionBackend, useClass: MockBackend},
        AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call server to add city', inject([DataService], (dataService) => {
    let spy = spyOn(dataService, 'addCityToUser').and.returnValue(Observable.empty());
    component.addCityToList('Warszawa');
    expect(spy).toHaveBeenCalledWith('Warszawa');
  }));
  it('should add city to userCityList', inject([DataService], (dataService) => {
    spyOn(dataService, 'addCityToUser').and.returnValue(Observable.from([200]));
    component.addCityToList('Warszawa');
    expect(component.userCityList.length).toBeGreaterThan(0);
  }))
  it('should add city to userCityList', inject([DataService], (dataService) => {
    spyOn(dataService, 'addCityToUser').and.returnValue(Observable.from([200]));
    component.addCityToList('Warszawa');
    expect(component.userCityList.length).toBeGreaterThan(0);
  }));
  it('should add city to userCityList', inject([DataService], (dataService) => {
    spyOn(dataService, 'addCityToUser').and.returnValue(Observable.from([200]));
    component.addCityToList('Warszawa');
    expect(dataService.state).toBe(true);
  }));
  it('should get cityList for user from server', inject([DataService], (dataService) => {
    let response = [[{"id": 27, "name": "Gdansk"}, {"id": 25, "name": "Warszawa"}, {"id": 26, "name": "Krakow"}]];
    spyOn(dataService, 'getCityListForUser').and.returnValue(Observable.from(response));
    component.getUserCity();
    console.log(component.userCityList);
    expect(component.userCityList.length).toBe(3);
  }));
  it('should call server for user cityList', inject([DataService], (dataService) => {
    let spy = spyOn(dataService, 'getCityListForUser').and.returnValue(Observable.empty());
    component.getUserCity()
    expect(spy).toHaveBeenCalled();
  }));
  it('should call server to delete city from user cityList', inject([DataService], dataService => {
    let spy = spyOn(dataService, 'deleteCityFromUserList').and.returnValue(Observable.from([200]));
    component.deleteCity('Warszawa')
    expect(spy).toHaveBeenCalledWith('Warszawa');
  }));
  xit('should delete city from cityList', () => {
  });
  it('should call to server for all cityList', inject([DataService], (dataService) => {
    let spy = spyOn(dataService, 'getCityList').and.returnValue(Observable.empty());
    component.getCityList();
    expect(spy).toHaveBeenCalled();
  }));
  it('should get all city from server', inject([DataService], dataService => {
    let response = [[{"id": 27, "name": "Gdansk"}, {"id": 25, "name": "Warszawa"}, {"id": 26, "name": "Krakow"}]];
    spyOn(dataService, 'getCityList').and.returnValue(Observable.from(response));
    component.getCityList();
    expect(component.cityList.length).toBe(3);
  }));
});
