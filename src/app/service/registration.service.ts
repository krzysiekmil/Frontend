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

  registration(username: string, password: string): Observable<string> {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
    let body = new User();
    body.username = username;
    body.password = password;
    return this.http.post(this.addUrl, body, options).map(res => res.status).catch(this.handleError);
  }

}
