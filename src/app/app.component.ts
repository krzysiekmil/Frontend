import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {DataService} from "./service/data.service";
import {City} from "./model/city";
import {UserComponent} from "./user/user.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogout: boolean;
  title = 'app';
  cityList: City[] = [];

  constructor(private router: Router, private userService: UserService, private dataService: DataService, private cdRef: ChangeDetectorRef, user: UserComponent) {
    this.isLogout = false;
    this.dataService.getCityList().subscribe(data => this.cityList = data);
  }

  ngDoCheck() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getData() {
    if (this.isUser)
      this.dataService.getCityListForUser().subscribe(data => this.cityList = data)
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
