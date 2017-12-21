import {Component, OnInit} from '@angular/core';
import {City} from '../model/city';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public cityList: City[] = [];
  public city: City;
  public change: boolean = null;


  constructor(private dataService: DataService) {
    this.city = new City();
  }


  getCityList() {
    this.dataService.getCityList().subscribe(data => this.cityList = data);

  }

  addCity(cityName: string) {
    this.dataService.addCityS(cityName).subscribe(status => {
        this.change = true;
      let city = new City()
      city.name = cityName;
      this.cityList.push(city);
    });
  }

  deleteCity(cityName: string) {
    let index = this.cityList.findIndex(c => c.name === cityName);
    this.cityList.splice(index, 1);
    this.dataService.deleteCity(cityName).subscribe(this.getCityList);
    this.change = true;

  }

  ngOnInit() {
    this.getCityList();
    this.change = false;
  }
}
