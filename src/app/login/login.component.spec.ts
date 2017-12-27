import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AuthenticationService} from "../service/authenticatoion.service";
import {ConnectionBackend, Http, HttpModule, RequestOptions} from "@angular/http";
import {UserService} from "../service/user.service";
import {MockBackend} from "@angular/http/testing";
import * as HTTP from "http";
import {Observable} from "rxjs/Observable";

describe('LoginComponent', () => {
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, HttpModule],
      declarations: [LoginComponent],
      providers: [AuthenticationService, Http, UserService,
        {provide: RequestOptions, useValue: [HTTP.METHODS]},
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: Router, useValue: router},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call server to login', inject([AuthenticationService], (authService) => {
    let spy = spyOn(authService, 'login').and.returnValue(Observable.empty());
    component.login();
    expect(spy).toHaveBeenCalled();
  }));
  it('should route after successful sing in', inject([AuthenticationService, UserService], (authService, userService) => {
    spyOn(authService, 'login').and.returnValue(Observable.empty());
    component.login();
    expect(router.navigate).not.toHaveBeenCalledWith(['user']);
  }));
  it('should route after successful sing in', inject([AuthenticationService, UserService], (authService, userService) => {
    let response = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiYXNkIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTUxNDQxMDM1OCwiYXV0aG9yaXRpZXMiOlsiU1RBTkRBUkRfVVNFUiJdLCJqdGkiOiJiYjA3ZWQyOC1hOTJjLTRmOTgtOWJiZS1hODYxMDNhMzA0Y2QiLCJjbGllbnRfaWQiOiJ0ZXN0and0Y2xpZW50aWQifQ.E2DdJFk40ZKkS6eAb7PgumPjsw6gprcDDZWWvHVnCAM';
    spyOn(authService, 'login').and.returnValue(Observable.from([response]));
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['user']);
  }));
  it('should ngOnInit after start', inject([AuthenticationService, UserService], (authService, userService) => {
    component.ngOnInit();
    expect(userService.accessToken).toBe(null);
  }));
});
