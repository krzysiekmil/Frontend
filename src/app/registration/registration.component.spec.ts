import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {DataService} from "../service/data.service";
import {AuthenticationService} from "../service/authenticatoion.service";
import {RegistrationService} from "../service/registration.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

describe('RegistrationComponent', () => {
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
        {provide: Router, useClass: jasmine.createSpy('navigate')}]
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
});
