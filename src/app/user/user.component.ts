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
    this.getCityList();
    this.getUserCity()
  }

  addCityToList(cityName: string) {
    this.dataService.addCityToUser(cityName).subscribe(this.getCityList);
  }

  getUserCity() {
    this.dataService.getCityListForUser().subscribe(result => this.currentUserCityList = result);
  }

  deleteCity(cityName: string) {
    this.dataService.deleteCityFromUserList(cityName).subscribe(this.getUserCity);
  }


  getCityList() {
    this.dataService.getCityList().subscribe(result => this.cityList = result);
  }

  isOnList(cityName: string) {
    return this.currentUserCityList.some(result => result.name == cityName);
  }
}
