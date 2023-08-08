import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  showError: boolean = false;
  icon=faSearch;
  weatherIconBaseUrl = 'http://openweathermap.org/img/wn/';
  hasClickedGetWeather: boolean = false;

  constructor(private weatherService: WeatherService) { }

  getWeather(): void {
    this.hasClickedGetWeather = true;

    if (!this.city) {
      this.weatherData = null;
      this.showError = false; 
      return;
    }

    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        this.showError = false; 
      },
      (error) => {
        console.log(error);
        this.weatherData = null; 
        this.showError = true; 
      }
    );
  }
  getWeatherIconUrl(iconCode: string): string {
    return `${this.weatherIconBaseUrl}${iconCode}@2x.png`;
  }
  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString();
  }
}
 





