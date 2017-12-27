import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {DataService} from "../service/data.service";
import {AuthenticationService} from "../service/authenticatoion.service";
import {RegistrationService} from "../service/registration.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('RegistrationComponent', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [RegistrationComponent],
      providers: [DataService,
        Http,
        ConnectionBackend,
        AuthenticationService,
        RegistrationService,
        UserService,
        {provide: Router, useValue: router}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should route after successful sing in', inject([RegistrationService, UserService], (regService, userService) => {
    spyOn(regService, 'registration').and.returnValue(Observable.from([200]));
    component.registration();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
  it('should call server to sing in', inject([RegistrationService, UserService], (regService, userService) => {
    let spy = spyOn(regService, 'registration').and.returnValue(Observable.empty());
    component.registration();
    expect(spy).toHaveBeenCalled();
  }));
});
