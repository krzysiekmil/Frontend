import {AfterViewChecked, ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, DoCheck, AfterViewChecked {
  ngOnInit() {
  }
  isLogout: boolean;
  title = 'app';
  cityList: City[] = [];

  constructor(private router: Router, private userService: UserService, private dataService: DataService, private cdRef: ChangeDetectorRef, private user: UserComponent) {
    this.isLogout = false;
  }

  ngDoCheck() {
    this.cityForUser();
    this.cityList.slice();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
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

  cityForUser() {
    if (this.isUser) {
      console.log(this.dataService.getState());
      if (this.dataService.getState()) {
        console.log(this.dataService.getState());
        this.dataService.setState(false);
        this.cityList = [];
        this.dataService.getCityListForUser().subscribe(data => this.cityList = data);
      }
    }
  }

}
