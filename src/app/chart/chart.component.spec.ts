import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartComponent} from './chart.component';
import {ChartsModule} from "ng2-charts";
import {DataService} from "../service/data.service";
import {ConnectionBackend, Http, HttpModule} from "@angular/http";
import {AuthenticationService} from "../service/authenticatoion.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import {MockBackend} from "@angular/http/testing";

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule, HttpModule],
      declarations: [ChartComponent],
      providers: [DataService, Http,
        {provide: ConnectionBackend, useClass: MockBackend},
        AuthenticationService,
        {provide: ActivatedRoute, useValue: {'params': Observable.from([{'name': 'Warszawa'}])}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
