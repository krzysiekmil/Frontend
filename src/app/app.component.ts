import {AfterViewChecked, ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {DataService} from "./service/data.service";
import {City} from "./model/city";
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck, AfterViewChecked {
  // @ViewChild(AdminComponent) admin:AdminComponent;
  ngOnInit() {
    this.dataService.getCityList().subscribe(data => this.cityList = data);
  }
  isLogout: boolean;
  title = 'app';
  cityList: City[] = [];

  constructor(private router: Router, private userService: UserService, private dataService: DataService, private cdRef: ChangeDetectorRef, private user: UserComponent, private admin: AdminComponent) {
    this.isLogout = false;
  }

  ngDoCheck() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getData() {
    if (this.isUser == true)
      if (this.admin.change == true) {
        this.admin.change = false;

        this.dataService.getCityList().subscribe(data => this.cityList = data);
      }
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
