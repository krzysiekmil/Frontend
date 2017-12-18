import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminComponent} from './admin.component';
import {DataService} from "../service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "../service/authenticatoion.service";
import {MockBackend} from "@angular/http/testing";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [AdminComponent],
      providers: [DataService, Http, AdminComponent, AuthenticationService,
        {provide: ConnectionBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

