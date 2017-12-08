import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {City} from "../model/city";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  cityList: City[];
  currentUserCityList: City[];

  constructor(private dataService: DataService, private userService: UserService) {
  }

  ngOnInit() {

  }

  addCityToList(name: string, citynName: string) {
    this.dataService.addCityToUser(name, citynName).subscribe(result => this.currentUserCityList = result);
  }

  getCityList() {
    this.dataService.getCityList().subscribe(result => this.cityList = result);
  }
}
