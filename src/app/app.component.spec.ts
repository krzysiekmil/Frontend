import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ChildrenOutletContexts, Router, RouterModule} from "@angular/router";
import {UserService} from "./service/user.service";
import {DataService} from "./service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "./service/authenticatoion.service";
import {UserComponent} from "./user/user.component";
import {Observable} from "rxjs/Observable";

describe('AppComponent', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, HttpModule],
      declarations: [AppComponent],
      providers: [{provide: Router, useValue: router},
        UserService, DataService, Http, ConnectionBackend,
        AuthenticationService, UserComponent, ChildrenOutletContexts]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as title 'app'`, async(() => {
    expect(component.title).toEqual('app');
  }));
  it('should call to server for cityList', inject([DataService, UserService], (dataService, userService) => {
    spyOn(userService, 'isUser').and.returnValue(true);
    spyOn(dataService, 'getState').and.returnValue(true);
    let response = [{id: 20, name: "Warszawa"}, {id: 21, name: "Lodz"}];
    let spy = spyOn(dataService, 'getCityListForUser').and.returnValue(Observable.empty());
    component.cityForUser();
    expect(spy).toHaveBeenCalled();
  }));
  it('should call to server for cityList', inject([DataService, UserService], (dataService, userService) => {
    spyOn(userService, 'isUser').and.returnValue(true);
    spyOn(dataService, 'getState').and.returnValue(true);
    let response = [{id: 20, name: "Warszawa"}, {id: 21, name: "Lodz"}];
    spyOn(dataService, 'getCityListForUser').and.returnValue(Observable.from([response]));
    component.cityForUser();
    expect(component.cityList.length).toBe(2);
  }));
  it('should route after logout', inject([UserService], (userService) => {
    component.logout();
    expect(router.navigate).toHaveBeenCalled;
  }));
  it('should return true if user is an Admin', inject([UserService], (userService) => {
    spyOn(userService, 'isAdmin').and.returnValue(true);
    expect(component.isAdmin).toBe(true);
  }));

});
