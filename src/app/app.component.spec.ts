import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ChildrenOutletContexts, Router, RouterModule} from "@angular/router";
import {UserService} from "./service/user.service";
import {DataService} from "./service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "./service/authenticatoion.service";
import {UserComponent} from "./user/user.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, HttpModule],
      declarations: [AppComponent],
      providers: [{provide: Router, useClass: jasmine.createSpy('navigate')},
        UserService, DataService, Http, ConnectionBackend,
        AuthenticationService, UserComponent, ChildrenOutletContexts]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
