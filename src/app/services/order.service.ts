import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { internalOrderInterface } from '../models/internalOrder-Interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  order: Observable<any>;

  constructor(private http: HttpClient) { }

  postOrder(total: number, products: object[], userID: string, stores: any[]){
    const urlApi = 'https://fadsi.herokuapp.com/api/orders';
    return this.http.post<internalOrderInterface>(
      urlApi,
      {userID, stores, products, total},
      {headers: this.headers})
      .pipe(map(data => data));
  }

  getOrder(){
    const urlApi = 'https://fadsi.herokuapp.com/api/orders';
    return this.http.get(urlApi);
  }

  getOrderById(id: String){
    const urlApi = `https://fadsi.herokuapp.com/api/orders/${id}`;
    return (this.order = this.http.get(urlApi));
  }


}
