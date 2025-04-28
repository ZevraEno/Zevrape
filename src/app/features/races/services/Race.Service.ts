import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environements/environment';
import {RaceDto} from '../models/RaceDto';


@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = `${environment.API_URL}/races`;

  findAll(): Observable<RaceDto[]> {
    return this._http.get<RaceDto[]>(this.baseUrl);
  }

  getRaceById(raceId: number): Observable<RaceDto> {
    return this._http.get<RaceDto>(`${this.baseUrl}/${raceId}`);
  }

  createRace(race: RaceDto): Observable<RaceDto> {
    return this._http.post<RaceDto>(`${this.baseUrl}/create`, race);
  }

  update(raceId: number, race: RaceDto): Observable<RaceDto> {
    return this._http.put<RaceDto>(`${this.baseUrl}/${raceId}`, race);
  }

  deleteById(raceId: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${raceId}`);
  }

  searchRaces(keyword: string): Observable<RaceDto[]> {
    return this._http.get<RaceDto[]>(`${this.baseUrl}/search?keyword=${encodeURIComponent(keyword)}`);
  }
}
