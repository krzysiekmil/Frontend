import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";

@Injectable()
export class RegistrationService {
  addUrl: string = 'http://localhost:8080/user';

  constructor(private http: Http) {
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

  registration(user: User): Observable<string> {
    // let body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    // let header = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let header = new Headers({'Content-Type': 'application/json'});
    //let body = new User(username,password);
    let options = new RequestOptions({headers: header});
    return this.http.post(this.addUrl, user, options).map(res => res.status).catch(this.handleError);
  }

}
