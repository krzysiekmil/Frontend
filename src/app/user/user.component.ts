import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {City} from "../model/city";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  cityList: City[] = [];
  currentUserCityList: City[] = [];
  city: City;
  change: boolean;

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.getCityList();
    this.getUserCity();
    this.change = false;

  }

  addCityToList(cityName: string) {
    this.dataService.addCityToUser(cityName).subscribe(this.getCityList);

  }

  getUserCity() {
    this.dataService.getCityListForUser().subscribe(result => this.currentUserCityList = result)
  }

  deleteCity(cityName: string) {
    let index = this.cityList.findIndex(c => c.name === cityName);
    this.currentUserCityList.splice(index, 1);
    this.dataService.deleteCityFromUserList(cityName).subscribe(this.getUserCity);
    this.change = true;
  }

  getCityList() {
    this.dataService.getCityList().subscribe(result => this.cityList = result);
  }

  isOnList(city: City) {
    return this.currentUserCityList.find(c => c.name == city.name);
  }
}
