import { Component } from '@angular/core';
import { Car } from 'src/models/car';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cars: Car[] = [];
  car!: Car;
  newCar: Car = new Car();

  constructor(
    private carService: CarService
  ) { }

  async getAllCars() {
    try {
      const carsResponse = await this.carService.gets().toPromise();
      this.cars = this.carService.getResponseValue(carsResponse);

    } catch(err) {
      alert(JSON.stringify(err));
    }
  }

  async getCar(carid: string) {
    try {
      const carResponse = await this.carService.get(carid).toPromise();
      this.car = this.carService.getResponseValue(carResponse);

    } catch(err) {
      alert(JSON.stringify(err));
    }
  }

  async onCarSubmit() {
    if ( !this.newCar ) {
      alert('car has not been set');
      return;
    }

    try {
      const msg = await this.carService.add(this.newCar).toPromise();
      alert(msg);

    } catch(err) {
      alert(JSON.stringify(err));
    }
  }

  async onEditSubmit() {
    if ( !this.car ) {
      alert('car has not been set');
      return;
    }

    try {
      const msg = await this.carService.edit(this.car).toPromise();
      alert(msg);

    } catch(err) {
      alert(JSON.stringify(err));
    }
  }

}
