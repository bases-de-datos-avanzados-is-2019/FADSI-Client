import { SiteInterface } from './../models/site-interface';
import {internalOrderInterface} from './../models/internalOrder-Interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
  public selectedSite : SiteInterface = {
    latitude: 0,
    longitude: 0,
    location: null,
    address: '',
    name: 'Test Name',
    description: '',
    deliveryPersonnelQuantity: 0,
    type: null,
    rating: 0,
    image: '',
    telephoneNumber: '',
    openingHours: null,
    website: '',
    products: null,
    id: '',
  };

  public siteUpdate: SiteInterface = {
    latitude: 0,
    longitude: 0,
    location: null,
    address: '',
    name: '',
    description: '',
    deliveryPersonnelQuantity: 0,
    type: null,
    rating: 0,
    image: '',
    telephoneNumber: '',
    openingHours: null,
    website: '',
    products: null,
    id: '',
  };

  public internalOrder : internalOrderInterface = {
    total : 0,
    products : [null]
  }



  setInternalOrder(){
    const orderString = localStorage.getItem('currentOrder');
    if (!isNullOrUndefined(orderString)) {
      const order: internalOrderInterface = JSON.parse(orderString);
      this.internalOrder = order;
    } else {
      let temp :  internalOrderInterface = {
        total : 0,
        products : [null]
      }
      this.internalOrder = temp;
    }
  }

  postSite(latitude: number, longitude: number, location: object, address: string, name: string,
           description: string, deliveryPersonnelQuantity: number, type: string[], rating: number,
           // tslint:disable-next-line:whitespace
           image: string, telephoneNumber: string, openingHours: string[], website: string, products: any[] ) {
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

  deleteSite(id: string){
    console.log(id);
    const urlApi = `https://fadsi.herokuapp.com/api/sites/${id}`;
    return this.http.delete<SiteInterface>(urlApi, { headers: this.headers }).pipe(map(data => data));
  }

  updateSite(site) {
    const urlApi = `https://fadsi.herokuapp.com/api/sites/${site.id}`;
    return this.http.put<SiteInterface>(urlApi, site, {headers: this.headers})
    .pipe(map(data => data));
  }

}
