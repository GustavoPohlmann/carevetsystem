import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anotacao } from '../models/anotacao';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Anotacao> {
    return this.http.get<Anotacao>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/anotacao/${id}`);
  }

  findAll(): Observable<Anotacao[]> {
    return this.http.get<Anotacao[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/anotacao`);
  }

  create(anotacao: Anotacao): Observable<Anotacao> {
    return this.http.post<Anotacao>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/anotacao`, anotacao);
  }

  update(anotacao : Anotacao): Observable<Anotacao>{
    return this.http.put<Anotacao>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/anotacao`, anotacao)
  }

  delete(id : any): Observable<Anotacao> {
    return this.http.delete<Anotacao>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/anotacao/${id}`)
  }

  findByIdUsuario(idUsuario: any): Observable<Anotacao> {
    return this.http.get<Anotacao>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/anotacao/find-by/${idUsuario}`);
  }
}
