import {ComponentFixture} from '@angular/core/testing';

import {AdminComponent} from './admin.component';
import {DataService} from "../service/data.service";
import {City} from "../model/city";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/empty'
import "rxjs/add/observable/from";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let dataService: DataService;
  let fixture: ComponentFixture<AdminComponent>;


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports:[HttpModule],
  //     declarations: [AdminComponent],
  //     providers:[DataService,AuthenticationService]
  //
  //
  //   })
  //     .compileComponents();
  // }));
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AdminComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    dataService = new DataService(null, null);
    component = new AdminComponent(dataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call server to add city to cityList', () => {
    let spy = spyOn(dataService, 'addCityS').and.returnValue(Observable.empty());
    component.addCity('Olsztyn');
    expect(spy).toHaveBeenCalledWith('Olsztyn')
  });
  it('should add city to cityList', () => {
    let spy = spyOn(dataService, 'addCityS').and.returnValue(Observable.from('Olsztyn'));
    component.addCity('Olsztyn');
    expect(component.cityList.length).toBeGreaterThan(0);
  });
  it('should call server to remove city from cityList', () => {
    let spy = spyOn(dataService, 'deleteCity').and.returnValue(Observable.empty());
    component.deleteCity('Olsztyn');
    expect(spy).toHaveBeenCalledWith('Olsztyn');
  });
  it('should call server to get city to cityList', () => {
    let cityList: City[] = [{id: 25, name: "Warszawa"}, {id: 26, name: "Wroclaw"}];
    spyOn(dataService, 'getCityList').and.callFake(() => {
      return Observable.from([cityList])
    });
    component.getCityList()
    expect(component.cityList.length).toBe(2);
  });
  xit('should remove city from cityList', () => {
    component.cityList.push({id: 12, name: "w"});
    spyOn(dataService, 'deleteCity').and.returnValue(Observable.from('Olsztyn'));
    component.deleteCity('Olsztyn');
    expect(component.cityList.length).not.toBeGreaterThan(0);
  });
});
