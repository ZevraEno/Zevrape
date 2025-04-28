import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NPC {
  id?: number;
  name: string;
  description?: string;
  race?: string;
  role?: string;
  classe?: string;
  level?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NpcService {
  private apiUrl = 'http://localhost:8080/api/npc';

  constructor(private http: HttpClient) {}

  getAll(): Observable<NPC[]> {
    return this.http.get<NPC[]>(this.apiUrl);
  }

  create(npc: NPC): Observable<NPC> {
    return this.http.post<NPC>(this.apiUrl, npc);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id: number, npc: NPC): Observable<NPC> {
    return this.http.put<NPC>(`${this.apiUrl}/${id}`, npc);
  }
}
