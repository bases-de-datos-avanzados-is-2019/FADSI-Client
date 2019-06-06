import { UserInterface } from './../models/user-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    'Conten-Type': 'application/json'
  });

  registerUser(nombre: string, primerApellido: string, segundoApellido: string, cedula: string,
               telefono: string, email: string, fechaNacimimiento: string, username: string,
               password: string, tipoUsuario: string ){
    const urlApi = 'https://fadsi.herokuapp.com/api/Users';
    return this.http.post<UserInterface>(
      urlApi,
      {
        nombre,
        primerApellido,
        segundoApellido,
        cedula,
        telefono,
        email,
        fechaNacimimiento,
        username,
        password,
        tipoUsuario
      },
      { headers: this.headers}
      )
      .pipe(map(data => data));
  }

  loginUser(username: string, password: string): Observable<any>{
    const urlApi = 'https://fadsi.herokuapp.com/api/Users/login?include=user';
    return this.http.post<UserInterface>(
      urlApi,
      {
        username,
        password
      },
      {headers: this.headers}
      )
      .pipe(map(data => data));
  }

  setUser(user: UserInterface): void {
    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  setToken(token): void{
    localStorage.setItem('accessToken', token);
  }

  getToken(){
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): UserInterface{
    const userString = localStorage.getItem('currentUser');
    if(!isNullOrUndefined(userString)){
      const user: UserInterface = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

  logoutUser(){
    const accessToken = localStorage.getItem('accessToken');
    const urlApi = `https://fadsi.herokuapp.com/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<UserInterface>(urlApi, {headers: this.headers});
  }
}
