import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformacaoPessoal } from '../models/informacaoPessoal';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class InformacaoPessoalService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<InformacaoPessoal> {
    return this.http.get<InformacaoPessoal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/informacao-pessoal/${id}`);
  }

  findAll(): Observable<InformacaoPessoal[]> {
    return this.http.get<InformacaoPessoal[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/informacao-pessoal`);
  }

  create(informacaoPessoal: InformacaoPessoal): Observable<InformacaoPessoal> {
    return this.http.post<InformacaoPessoal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/informacao-pessoal`, informacaoPessoal);
  }

  update(informacaoPessoal : InformacaoPessoal): Observable<InformacaoPessoal>{
    return this.http.put<InformacaoPessoal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/informacao-pessoal`, informacaoPessoal)
  }

  delete(id : any): Observable<InformacaoPessoal> {
    return this.http.delete<InformacaoPessoal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/informacao-pessoal/${id}`)
  }

  findByIdUsuario(idUsuario: any): Observable<InformacaoPessoal> {
    return this.http.get<InformacaoPessoal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/informacao-pessoal/find-by/${idUsuario}`);
  }
}
