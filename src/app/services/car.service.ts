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

}

interface GetResponse {
  response: string
}
