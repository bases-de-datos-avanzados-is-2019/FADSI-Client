import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {

  constructor(private http: HttpClient) { }

  getETL() {
    const urlApi = `https://fadsi.herokuapp.com/neo/etl`;
    return this.http.get(urlApi);
  }

  getOrderByClientId(id: string) {
    const urlApi = `https://fadsi.herokuapp.com/neo/order/${id}`;
    return this.http.get(urlApi);
  }

  getTopSites() {
    const urlApi = `https://fadsi.herokuapp.com/neo/topSites`;
    return this.http.get(urlApi);
  }

  getRequestSites(clientId: string) {
    const urlApi = `https://fadsi.herokuapp.com/neo/order/site/${clientId}`;
    return this.http.get(urlApi);
  }

  getCommonClients(clientId: string){
    const urlApi = `https://fadsi.herokuapp.com/neo/order/client/${clientId}`;
    return this.http.get(urlApi);
  }

  getRoute(clientId: string, siteId: string){
    const urlApi = `https://fadsi.herokuapp.com/neo/path/client/${clientId}/site/${siteId}`;
    return this.http.get(urlApi);
  }

  postEmail(clientId: string){
    const urlApi = `https://fadsi.herokuapp.com/email/${clientId}`;
    return this.http.get(urlApi);
  }


}
