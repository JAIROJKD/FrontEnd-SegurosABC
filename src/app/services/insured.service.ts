import { Injectable, inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuredService {
  private apiUrl = '/api/Insureds'; // Ajusta la URL según la API

  private http = inject(HttpClient);

  // ✅ Declaración de `selectedInsuredSubject` con `BehaviorSubject`
  private selectedInsuredSubject = new BehaviorSubject<any>(null);
  selectedInsured$ = this.selectedInsuredSubject.asObservable();

  constructor() {}

  getInsureds(page: number = 1, pageSize: number = 10): Observable<any[]> {
    const url = `${this.apiUrl}/GetInsured?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any[]>(url);
  }

  // ✅ Método para eliminar un asegurado
  deleteInsured(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteInsured/${id}`);
  }

  // ✅ Método para registrar un asegurado
  createInsured(insuredData: any) {
    return this.http.post(`${this.apiUrl}/CreateInsured`, insuredData);
  }

  
  updateInsured(id: number, insuredData: any) {
    return this.http.put(`${this.apiUrl}/UpdateInsured/${id}`, insuredData);
  }

  // ✅ Método para pasar los datos del asegurado seleccionado al formulario
  setSelectedInsured(insured: any) {
    this.selectedInsuredSubject.next(insured);
  }
}

