import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Usuario} from '../modelo/Usuario';

interface ICredencialesRequest{
  username: string;
  clave: string;
 }




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.HOST}/users`;
  constructor(
  private http: HttpClient,
  private router: Router
  ) { }
  login(username: string, clave: string){
  const body: ICredencialesRequest = { username, clave};
  return this.http.post<Usuario>(this.url+`/login`, body);
  }
  logout(){
  sessionStorage.clear();
  this.router.navigate(['login']);
  }

  isLogged(){
  return sessionStorage.getItem(environment.TOKEN_NAME) != null;
  }

}
