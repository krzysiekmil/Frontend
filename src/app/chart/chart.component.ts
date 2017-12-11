import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {City} from "../model/city";
import {CityData} from "../model/cityData"


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  cityList: City[];
  public cityData: CityData;
  public currentCityData: CityData[];
  public lineChartData: any[] = [];
  public lineChartLabels: Array<any> = [];
  public chartData: Array<any[]> = [];
  public dataSets: Array<{ data: Array<any[]> | any[], label: string }>;

  public constructor(private dataService: DataService) {
  }


  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit() {
    this.getCity();

  }

  public getCity() {
    return this.dataService.getCityList().subscribe(data => {
      this.cityList = data;
      this.cityList.forEach(city => {
        this.getCityData(city.name);
        this.chartData = this.chartData.slice();
      });
    });
  }

  public getAllTemp() {
    return this.dataService.getAllTemp().subscribe(data => this.currentCityData = data);
  }

  public getCityData(name: string) {
    let count = 1;
    return this.dataService.getTempCity(name).subscribe(
      data => {
        this.currentCityData = data;
        this.currentCityData.forEach(cd => {
          this.lineChartData.push(cd.temp);
          if (count <= 10) {
            count++;
            this.lineChartLabels.push(cd.time);
          }
        });
        this.chartData.push(this.lineChartData)
        this.lineChartLabels = this.lineChartLabels.slice();
        this.lineChartData = this.lineChartData.slice();
      });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

