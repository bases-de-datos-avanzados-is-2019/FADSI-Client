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

  postRoute(idCliente: string, idMainSite: string, possibleSites: any[]) {
    const urlApi = 'https://fadsi.herokuapp.com/api/routes';
    return this.http.post<RouteInterface>(
      urlApi,
      {
       idCliente: idCliente,
       idMainSite: idMainSite,
       possibleSites: possibleSites
      },
      {headers: this.headers})
      .pipe(map(data => data));
  }

  getRoutes(){
    const urlApi = 'https://fadsi.herokuapp.com/api/routes';
    return this.http.get(urlApi);
  }

  getRoutesByClientId(clientId: string){
    const urlApi = `https://fadsi.herokuapp.com/api/routes?filter=%7B%22where%22%3A%7B%22idCliente%22%3A%7B%22like%22%3A%22${clientId}%22%7D%7D%7D`;
    return this.http.get(urlApi);
  }

  getRoutesByMainSiteId(mainSiteId: string){
    const urlApi = `https://fadsi.herokuapp.com/api/routes?filter=%7B%22where%22%3A%7B%22idMainSite%22%3A%7B%22like%22%3A%22${mainSiteId}%22%7D%7D%7D`;
    return this.http.get(urlApi);
  }

  getRouteById(id: string){
    const urlApi = `https://fadsi.herokuapp.com/api/routes/${id}`;
    return this.http.get(urlApi);
  }

}
