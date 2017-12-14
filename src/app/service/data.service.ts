import {Injectable} from '@angular/core';
import {CityData} from '../model/cityData';
import {City} from '../model/city';
import {Observable} from "rxjs/Observable";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch"
import {User} from "../model/user";
import {AuthenticationService} from "./authenticatoion.service";
import {Role} from "../model/role";

@Injectable()
export class DataService {
  private cityUrl = 'http://localhost:8080/city';
  private cityData = 'http://localhost:8080/cityData';
  private currentCityData = 'http://localhost:8080/cityDatat/';
  private addCityURL = 'http://localhost:8080/city';
  private deleteCityURL = 'http://localhost:8080/city';
  private getCityListURL = 'http://localhost:8080/city';
  private userUrl = 'http://localhost:8080/user';
  private state: boolean;
  public cityList: City[] = [];


  constructor(private http: Http, private auth: AuthenticationService) {
  }

  public getState(): boolean {
    return this.state;
  }

  public setState(state: boolean) {
    this.state = state;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  private extractData(res: Response) {
    return res.json();
  }

  public getUser(): Observable<User[]> {
    return this.http.get(this.userUrl, null).map(this.extractData).catch(this.handleError);
  }

  public updateRole(role: Role) {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.put(this.userUrl, role, option).map(this.extractData).catch(this.handleError)
  }

  public update(user: User) {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.put(this.userUrl, user, option).map(this.extractData).catch(this.handleError)
  }


  public getTempCity(cityName: string): Observable<CityData[]> {
    return this.http.get(this.currentCityData + cityName, null)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAllTemp(): Observable<CityData[]> {
    return this.http.get(this.cityData).map(this.extractData).catch(this.handleError);
  }


  public getTempCurrentCity(cityName: string, value: string): Observable<CityData[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('value', value);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.currentCityData + cityName, option)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public addCityS(cityName: string): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('name', cityName);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.post(this.cityUrl, null, option)
      .map(success => success.status)
      .catch(this.handleError);
  }

  public deleteCity(cityName: string): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('name', cityName);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.delete(this.cityUrl, option)
      .map(success => success.status)
      .catch(this.handleError);
  }

  public getCityList(): Observable<City[]> {
    return this.http.get(this.getCityListURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCityListForUser(): Observable<City[]> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('name', this.auth.username);
    let option = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.get(this.userUrl, option).map(this.extractData).catch(this.handleError);
  }

  public refreshData() {
    return this.http.post(this.cityData, null, null).map(success => success.status).catch(this.handleError);
  }

  public addCityToUser(cityName: string) {
    let header = new Headers({'Content-Type': 'application/json'})
    let param = new URLSearchParams();
    param.set('city', cityName);
    let option = new RequestOptions({headers: header, params: param});
    let body = new User();
    body.username = this.auth.username;
    console.log(body.username);
    return this.http.post(this.userUrl, body, option);
  }

  public deleteCityFromUserList(cityName: string) {
    let header = new Headers({'Content-Type': 'application/json'})
    let param = new URLSearchParams();
    param.set('city', cityName);
    let option = new RequestOptions({headers: header, params: param})
    return this.http.delete(this.userUrl + "/" + this.auth.username, option);
  }
}
