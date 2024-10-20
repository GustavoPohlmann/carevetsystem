import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Animal> {
    return this.http.get<Animal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/animal/${id}`);
  }

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/animal`);
  }

  create(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/animal`, animal);
  }

  update(animal : Animal): Observable<Animal>{
    return this.http.put<Animal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/animal`, animal)
  }

  delete(id : any): Observable<Animal> {
    return this.http.delete<Animal>(`${API_CONFIG.baseUrl}${API_CONFIG.versao}/animal/${id}`)
  }
}
