import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {DataService} from "../service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "../service/authenticatoion.service";
import {MockBackend} from "@angular/http/testing";

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
});
