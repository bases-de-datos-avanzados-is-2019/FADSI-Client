import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteInterface } from '../models/route-interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  postRoute(idCliente: string, idMainSite: string, possibleSite: any[]) {
    const urlApi = 'https://fadsi.herokuapp.com/api/routes';
    return this.http.post<RouteInterface>(
      urlApi,
      {
       idCliente,
       idMainSite,
       possibleSite
      },
      {headers: this.headers})
      .pipe(map(data => data));
  }

  getRoutes(){
    const urlApi = 'https://fadsi.herokuapp.com/api/routes';
    return this.http.get(urlApi);
  }

}
