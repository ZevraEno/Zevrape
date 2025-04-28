import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environements/environment';
import {EquipmentDto} from '../models/EquipmentDto';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = `${environment.API_URL}/equipments`;

  findAll(): Observable<EquipmentDto[]> {
    return this._http.get<EquipmentDto[]>(this.baseUrl);
  }

  getEquipmentById(equipmentId: number): Observable<EquipmentDto> {
    return this._http.get<EquipmentDto>(`${this.baseUrl}/${equipmentId}`);
  }

  createEquipment(equipment: EquipmentDto): Observable<EquipmentDto> {
    return this._http.post<EquipmentDto>(`${this.baseUrl}/create`, equipment);
  }

  update(equipmentId: number, equipment: EquipmentDto): Observable<EquipmentDto> {
    return this._http.put<EquipmentDto>(`${this.baseUrl}/${equipmentId}`, equipment);
  }

  deleteById(equipmentId: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${equipmentId}`);
  }

  searchEquipments(keyword: string): Observable<EquipmentDto[]> {
    return this._http.get<EquipmentDto[]>(`${this.baseUrl}/search?keyword=${encodeURIComponent(keyword)}`);
  }
}
