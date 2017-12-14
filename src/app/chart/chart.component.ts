import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {City} from "../model/city";
import {CityData} from "../model/cityData"
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit, OnDestroy {
  cityList: City[];
  public cityData: CityData;
  public currentCityData: CityData[];
  public lineChartData: any[] = [];
  public lineChartLabels: Array<any> = [];
  public chartData: Array<any> = [];
  public dataSets: Array<{ data: Array<any[]> | any[], label: string }>;
  public name: string;
  private sub: any;
  private nameLast: string;
  private tempLast: any;
  private timeLast: any;
  private status: number;
  public constructor(private dataService: DataService, private route: ActivatedRoute) {
  }


  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#6effd1',
      pointHoverBackgroundColor: '#ff646e',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#ff4653',
      pointHoverBackgroundColor: '#ff33f9',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#d0ff8a',
      pointHoverBackgroundColor: '#27ff82',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
    });
    this.getCityData(this.name);
  }

  ngDoCheck() {
    if (this.name != this.nameLast) {
      this.nameLast = this.name;
      this.getCityData(this.name);
    }
  }

  setTempAndTime() {
    this.tempLast = this.currentCityData.find(d => d.id > 0).temp;
    this.timeLast = this.currentCityData.find(d => d.id > 0).time;

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCity() {
    return this.dataService.getCityList().subscribe(data => {
      this.cityList = data;
      this.cityList.forEach(city => {
        this.getCityData(city.name);
        this.chartData = this.chartData.slice();
        this.chartData.push(this.lineChartData);
        this.lineChartData = [];
      });
    });
  }

  public getAllTemp() {
    return this.dataService.getAllTemp().subscribe(data => this.currentCityData = data);
  }

  public getCityData(name: string) {
    return this.dataService.getTempCity(name).subscribe(
      data => {
        this.currentCityData = data;
        this.currentCityData.forEach(cd => {
          this.lineChartData.push(cd.temp);
          this.lineChartLabels.push(cd.time);
        });
        this.setTempAndTime();
        this.lineChartData.reverse();
        this.lineChartLabels.reverse();
        this.lineChartLabels = this.lineChartLabels.slice();
        this.lineChartData = this.lineChartData.slice();
      })
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public refresh(): void {
    this.dataService.refreshData().subscribe(code => {
      this.status = code
    });
    this.lineChartLabels.splice(0, this.lineChartLabels.length);
    this.lineChartData = [];
    if (this.status === 200 || this.status === 201) {
      setTimeout(this.getCityData(this.name), 25000);
    }
  }

}

