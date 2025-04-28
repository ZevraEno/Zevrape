import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  users: any[] = [];
  ready = false;
  private intervalSub!: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.joinRoom();
    this.intervalSub = interval(3000).subscribe(() => {
      this.loadConnectedUsers();
      this.checkReady();
    });
  }

  ngOnDestroy(): void {
    this.leaveRoom();
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }

  joinRoom() {
    this.http.post('/api/waiting-room/join', {}).subscribe();
  }

  leaveRoom() {
    this.http.post('/api/waiting-room/leave', {}).subscribe();
  }

  loadConnectedUsers() {
    this.http.get<any[]>('api/waiting-room/users').subscribe(users => {
      this.users = users;
    });
  }

  checkReady() {
    this.http.get<boolean>('/api/waiting-room/ready').subscribe(isReady => {
      this.ready = isReady;
    });
  }

  startGame() {
    this.router.navigate(['/game-interface']);
    this.router.navigate(['/interface']);
  }
}
