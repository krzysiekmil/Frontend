import {Injectable} from '@angular/core';
import {CityData} from '../model/cityData';
import {City} from '../model/city';
import {Observable} from "rxjs/Observable";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch"

@Injectable()
export class DataService {
  private cityUrl = 'http://localhost:8080/city';
  private cityData = 'http://localhost:8080/cityData';
  private currentCityData = 'http://localhost:8080/cityDatat/';
  private addCityURL = 'http://localhost:8080/city';
  private deleteCityURL = 'http://localhost:8080/city';
  private getCityListURL = 'http://localhost:8080/city';


  constructor(private http: Http) {
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  private extractData(res: Response) {
    return res.json();
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

  l;

  public login(username: string, password: string): void {
    return
  }
}
