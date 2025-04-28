import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environements/environment';
import {GuideDto} from '../models/GuideDto';


@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = `${environment.API_URL}/guides`;

  findAll(): Observable<GuideDto[]> {
    return this._http.get<GuideDto[]>(this.baseUrl);
  }

  getGuideById(guideId: number): Observable<GuideDto> {
    return this._http.get<GuideDto>(`${this.baseUrl}/${guideId}`);
  }

  createGuide(guide: GuideDto): Observable<GuideDto> {
    return this._http.post<GuideDto>(`${this.baseUrl}/create`, guide);
  }

  update(guideId: number, guide: GuideDto): Observable<GuideDto> {
    return this._http.put<GuideDto>(`${this.baseUrl}/${guideId}`, guide);
  }

  deleteById(guideId: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${guideId}`);
  }

  searchGuides(keyword: string): Observable<GuideDto[]> {
    return this._http.get<GuideDto[]>(`${this.baseUrl}/search?keyword=${encodeURIComponent(keyword)}`);
  }
}
