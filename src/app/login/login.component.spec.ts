import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AuthenticationService} from "../service/authenticatoion.service";
import {ConnectionBackend, Http, HttpModule, RequestOptions} from "@angular/http";
import {UserService} from "../service/user.service";
import {MockBackend} from "@angular/http/testing";
import * as HTTP from "http";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, HttpModule],
      declarations: [LoginComponent],
      providers: [AuthenticationService, Http, UserService,
        {provide: RequestOptions, useValue: [HTTP.METHODS]},
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: Router, useClass: jasmine.createSpy('navigate')},
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
});
