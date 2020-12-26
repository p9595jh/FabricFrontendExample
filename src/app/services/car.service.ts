import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from 'src/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient
  ) { }

  gets() {
    return this.http.get<GetResponse>('/api/queryallcars').pipe();
  }

  get(carid: string) {
    return this.http.get<GetResponse>(`/api/query/${carid}`).pipe();
  }

  add(car: Car) {
    return this.http.post<string>('/api/addcar', car).pipe();
  }

  edit(car: Car) {
    return this.http.put<string>(`/api/changeowner/${car.carid}`, car).pipe();
  }

  getResponseValue(res: GetResponse) {
    return JSON.parse(res.response);
  }

  getResponseValues(res: GetResponse) {
    const list: any[] = JSON.parse(res.response);
    const cars: Car[] = [];
    list.map(car => cars.push({
      carid: car.Key,
      colour: car.Record.colour,
      make: car.Record.make,
      model: car.Record.model,
      owner: car.Record.owner
    }));
    return cars;
  }

}

interface GetResponse {
  response: string
}
