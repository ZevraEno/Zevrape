import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) {}

  createGameSession() {
    return this.http.post('/api/game/start', {});
  }

  getPlayers() {
    return this.http.get<any[]>('/api/game/players');
  }
}
