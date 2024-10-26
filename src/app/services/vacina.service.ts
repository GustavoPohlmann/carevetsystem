import { Injectable } from '@angular/core';
import { Vacina } from '../models/vacina';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Vacina> {
    return this.http.get<Vacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/vacina/${id}`);
  }

  findAll(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/vacina`);
  }

  create(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/vacina`, vacina);
  }

  update(vacina : Vacina): Observable<Vacina>{
    return this.http.put<Vacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/vacina`, vacina)
  }

  delete(id : any): Observable<Vacina> {
    return this.http.delete<Vacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/vacina/${id}`)
  }

  findByIdCadernetaVacina(idCadernetaVacina: any): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/vacina/find-by-id-caderneta-vacina/${idCadernetaVacina}`);
  }

}
