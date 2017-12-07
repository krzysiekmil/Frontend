import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogout: boolean;
  title = 'app';

  constructor(private router: Router, private userService: UserService) {
    this.isLogout = true;
  }

  logout() {
    this.isLogout = false;
    this.userService.logout();
    this.router.navigate(['/']);
  }

  get isAdmin() {
    this.isLogout = true;
    return this.userService.isAdmin();
  }

  get isUser() {
    this.isLogout = true;
    return this.userService.isUser();
  }
}
