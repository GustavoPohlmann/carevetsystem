import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prontuario } from '../models/prontuario';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario/${id}`);
  }

  findAll(): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario`);
  }

  create(prontuario: Prontuario): Observable<Prontuario> {
    return this.http.post<Prontuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario`, prontuario);
  }

  update(prontuario : Prontuario): Observable<Prontuario>{
    return this.http.put<Prontuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario`, prontuario)
  }

  delete(id : any): Observable<Prontuario> {
    return this.http.delete<Prontuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario/${id}`)
  }

  findByIdAnimal(idAnimal : any): Observable<Prontuario[]> {
    return this.http.get<Prontuario[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario/find-by-id-animal/${idAnimal}`);
  }

  findByIdAgenda(idAgenda : any): Observable<Prontuario> {
    return this.http.get<Prontuario>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/prontuario/find-by-id-agenda/${idAgenda}`);
  }
}
