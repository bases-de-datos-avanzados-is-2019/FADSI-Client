import { OrderInterface } from './../models/order-interface';
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
  orders: Observable<any>;

  constructor(private http: HttpClient) { }

  postOrder( extraDetail: string, totalSum: number, items: object[], idCliente: string, idSitios: any[]){
    const urlApi = 'https://fadsi.herokuapp.com/api/orders';
    console.log('Hello from the post (. ) (. )');
    console.log(items);
    return this.http.post<OrderInterface>(
      urlApi,
      {idCliente: idCliente,
        idSitios: idSitios,
        items: items,
        extraDetail: extraDetail,
        totalSum: totalSum},
      {headers: this.headers})
      .pipe(map(data => data));
  }

  getOrder(){
    const urlApi = 'https://fadsi.herokuapp.com/api/orders';
    return this.http.get(urlApi);
  }

  getOrderById(id: string){
    const urlApi = `https://fadsi.herokuapp.com/api/orders/${id}`;
    return (this.order = this.http.get(urlApi));
  }

  getOrdersByClientId(clientId: string){
    const urlApi = `https://fadsi.herokuapp.com/api/orders?filter=%7B%22where%22%3A%7B%22idCliente%22%3A%7B%22like%22%3A%22${clientId}%22%7D%7D%7D`;
    return (this.orders = this.http.get(urlApi));
  }


}
