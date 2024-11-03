import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutrosService {

  constructor(private http: HttpClient) { }

  generatePdfObito(idAnimal : any): Observable<Blob> {
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/outros/generate-pdf-obito/${idAnimal}`, { responseType: 'blob' });
  }

  generatePdfTermoConsentimento(idAnimal : any): Observable<Blob> {
    return this.http.get(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/outros/generate-pdf-termo-consentimento/${idAnimal}`, { responseType: 'blob' });
  }

}
