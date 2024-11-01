import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agenda } from '../models/agenda';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Agenda> {
    return this.http.get<Agenda>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/agenda/${id}`);
  }

  findAll(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/agenda`);
  }

  create(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/agenda`, agenda);
  }

  update(agenda : Agenda): Observable<Agenda>{
    return this.http.put<Agenda>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/agenda`, agenda)
  }

  delete(id : any): Observable<Agenda> {
    return this.http.delete<Agenda>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/agenda/${id}`)
  }

  findAtendimentoDiario(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/agenda/find-atendimento-diario`);
  }
}
