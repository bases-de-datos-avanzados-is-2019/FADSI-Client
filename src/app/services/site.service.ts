import { SiteInterface } from './../models/site-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  postSite(latitude: number, longitude: number, location: object, address: string, name: string,
           description: string, deliveryPersonnelQuantity: number, type: string[], rating: number,
           image: string, telephoneNumber: string, openingHours: string[], website: string, products: [object] ) {
    const urlApi = 'https://fadsi.herokuapp.com/api/sites';
    return this.http.post<SiteInterface>(
      urlApi,
      {latitude, longitude, location, address, name, description, deliveryPersonnelQuantity, type, rating,
       image, telephoneNumber, openingHours, website, products},
      {headers: this.headers})
      .pipe(map(data => data));
  }

  getSites() {
    const urlApi = 'https://fadsi.herokuapp.com/api/sites';
    return this.http.get(urlApi);
  }
}
