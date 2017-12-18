import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {AuthenticationService} from "../service/authenticatoion.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {UserService} from "../service/user.service";
import {Observable} from "rxjs/Observable";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, HttpModule],
      declarations: [LoginComponent],
      providers: [{provide: Router, useClass: jasmine.createSpy('navigate')},
        {provide: ActivatedRoute, useValue: {params: Observable.of('user')}},
        AuthenticationService, Http, ConnectionBackend,
        UserService]
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
