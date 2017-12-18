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
  userCityList: City[] = [];
  city: City;

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.getCityList();
    this.getUserCity();
    this.dataService.setState(true);

  }

  addCityToList(cityName: string) {
    cityName[0].toLocaleUpperCase();
    this.dataService.addCityToUser(cityName).subscribe(success => {
      if (success === 200) {
        let city = new City();
        city.name = cityName;
        this.userCityList.push(city);
        this.dataService.setState(true);
      }
    });

  }

  getUserCity() {
    this.dataService.getCityListForUser().subscribe(result => this.userCityList = result)
  }

  deleteCity(cityName: string) {
    this.dataService.deleteCityFromUserList(cityName).subscribe(success => {
      if (success === 200) {
        this.dataService.setState(true);
        let index = this.userCityList.findIndex(c => c.name === cityName);
        this.userCityList.splice(index, 1);
      }
    });
  }

  getCityList() {
    this.dataService.getCityList().subscribe(result => this.cityList = result);
  }

  isOnList(city: City): boolean {
    return this.userCityList.some(c => c.name == city.name);
  }
}
