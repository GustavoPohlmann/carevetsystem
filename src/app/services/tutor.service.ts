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

  findAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/tutor`);
  }
}
