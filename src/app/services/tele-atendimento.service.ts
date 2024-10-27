import { Injectable } from '@angular/core';
import { TeleAtendimento } from '../models/teleAtendimento';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeleAtendimentoService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<TeleAtendimento> {
    return this.http.get<TeleAtendimento>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento/${id}`);
  }

  findAll(): Observable<TeleAtendimento[]> {
    return this.http.get<TeleAtendimento[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento`);
  }

  create(teleAtendimento: TeleAtendimento): Observable<TeleAtendimento> {
    return this.http.post<TeleAtendimento>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento`, teleAtendimento);
  }

  update(teleAtendimento : TeleAtendimento): Observable<TeleAtendimento>{
    return this.http.put<TeleAtendimento>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento`, teleAtendimento)
  }

  delete(id : any): Observable<TeleAtendimento> {
    return this.http.delete<TeleAtendimento>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento/${id}`)
  }

  findByIdProntuario(idProntuario: any): Observable<TeleAtendimento> {
    return this.http.get<TeleAtendimento>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento/find-by-id-prontuario/${idProntuario}`);
  }
  
  criarTeleAtendimentoByIdProntuario(idProntuario: any): Observable<TeleAtendimento> {
    return this.http.get<TeleAtendimento>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tele-atendimento/criar-tele-atendimento-by/${idProntuario}`);
  }
}
