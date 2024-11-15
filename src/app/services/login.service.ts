import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwtService : JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(log: Login){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, log, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successfulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticate(){
    let token = localStorage.getItem('token');
    if(token != null){
      return !this.jwtService.isTokenExpired(token);
    }

    return false;
  }

  logout(){
    localStorage.clear();
  }
}
