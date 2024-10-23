import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadernetaVacina } from '../models/cadernetaVacina';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CadernetaVacinaService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<CadernetaVacina> {
    return this.http.get<CadernetaVacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/caderneta-vacina/${id}`);
  }

  findAll(): Observable<CadernetaVacina[]> {
    return this.http.get<CadernetaVacina[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/caderneta-vacina`);
  }

  create(cadernetaVacina: CadernetaVacina): Observable<CadernetaVacina> {
    return this.http.post<CadernetaVacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/caderneta-vacina`, cadernetaVacina);
  }

  update(cadernetaVacina : CadernetaVacina): Observable<CadernetaVacina>{
    return this.http.put<CadernetaVacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/caderneta-vacina`, cadernetaVacina)
  }

  delete(id : any): Observable<CadernetaVacina> {
    return this.http.delete<CadernetaVacina>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/caderneta-vacina/${id}`)
  }

}
