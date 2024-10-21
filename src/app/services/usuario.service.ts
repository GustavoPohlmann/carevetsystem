import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/usuario/${id}`);
  }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/usuario`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/usuario`, usuario);
  }

  update(usuario : Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/usuario`, usuario)
  }

  delete(id : any): Observable<Usuario> {
    return this.http.delete<Usuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/usuario/${id}`)
  }

  findByLogin(login:String): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/usuario/login/${login}`);
  }
}
