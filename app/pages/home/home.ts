import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [WeatherService]
})
export class HomePage {
  public weatherData;
  public zipCode;
  public zipCodeRefresh;
  public refreshZipCodeQuery;
  public weatherForecast;
  public weatherForecastPeriods;

  public thatWeatherData=this.weatherData;
  public thatWeatherForecast=this.weatherForecast;

  constructor(private navCtrl: NavController,
              private weatherService: WeatherService) {

  }

  // todo: fu D3 charts https://github.com/mhartington/ionicv2-c3js

  getWeatherConditionsByZip(thatWeatherData) {
    this.weatherService.getWeatherConditionsByZip(this.zipCode).subscribe(
      data => {
        this.weatherData = data.json();

      },
      err => console.error(err),
      () => {
        console.log('get weather CONDITIONS for (' + this.zipCode + ') completed');
        console.log('data: ', JSON.stringify(this.weatherData,null,2));
        this.zipCodeRefresh = true;
        this.refreshZipCodeQuery = true;
      }
    );
  }

  getWeatherForecastByZip(thatWeatherForecast) {
    this.weatherService.getWeatherForecastByZip(this.zipCode).subscribe(
      data => {
        this.weatherForecast = data.json();
        this.weatherForecastPeriods=this.weatherForecast.forecast.txt_forecast.forecastday;
      },
      err => console.error(err),
      () => {
        this.zipCodeRefresh = true;
        this.refreshZipCodeQuery = true;
        console.log('get weather FORECAST for (' + this.zipCode + ') completed');
        console.log('data: ', JSON.stringify(this.weatherForecast,null,2));
        console.log('get weather FORECAST PERIODS for (' + this.zipCode + ') completed');
        console.log('data: ', JSON.stringify(this.weatherForecastPeriods,null,2));
      }
    );
  }

}
