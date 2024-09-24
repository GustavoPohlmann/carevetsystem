import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Tutor> {
    return this.http.get<Tutor>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tutor/${id}`);
  }

  findAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tutor`);
  }

  create(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tutor`, tutor);
  }

  update(tutor : Tutor): Observable<Tutor>{
    return this.http.put<Tutor>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tutor`, tutor)
  }

  delete(id : any): Observable<Tutor> {
    return this.http.delete<Tutor>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tutor/${id}`)
  }
}
