import {Injectable} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {TOKEN_NAME} from "./auth.constant";


@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  admin_role: boolean;
  userName: string;

  constructor() {
  }

  login(accessTokens: string) {
    let decodedToken = this.jwtHelper.decodeToken(accessTokens);
    console.log(decodedToken);
    this.admin_role = decodedToken.authorities.some(role => role === 'ADMIN_USER');
    this.userName = decodedToken.get("user_name");
    this.accessToken = accessTokens;
    localStorage.setItem(TOKEN_NAME, this.accessToken);

  }

  logout() {
    this.accessToken = null;

    localStorage.removeItem(TOKEN_NAME);
    this.admin_role = false;
  }

  isAdmin(): boolean {
    return this.admin_role;
  }

  isUser(): boolean {
    return ((this.accessToken && !this.admin_role) || this.admin_role);
  }
}
