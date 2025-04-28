import { Component, computed, effect, inject, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { CommonModule, NgClass, NgIf, NgFor } from '@angular/common';
import { UserTokenDto } from './features/auth/models/user-token-dto';
import { AuthService } from './features/auth/services/auth.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    NgClass,
    NgIf,
    NgFor,
    RouterLink,
  ],
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      font-family: 'Segoe UI', sans-serif;
    }

    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(90deg, #a31919, #ffffff);
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .app-title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .auth-buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn, .user-role {
      background-color: #ffffff;
      color: #6300dc;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s ease-in-out;
    }

    .btn:hover {
      background-color: #ddd;
    }

    .app-nav {
      background-color: #4e00d5;
      color: white;
      padding: 0.5rem 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: space-evenly;
    }

    .menu-list li {
      margin-bottom: 0;
    }

    .menu-link {
      display: block;
      color: inherit;
      text-decoration: none;
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background 0.2s;
    }

    .menu-link:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .app-container {
      display: grid;
      width: 100%;
      flex: 1;
      overflow: hidden;
      justify-content: center;
      position: relative;
      background-image: url("src/app/shared/images/modal_img_1 (1).jpg");
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }

    aside {
      width: 260px;
      padding: 1rem;
      overflow-y: auto;
      box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
      transition: background 0.3s;
    }

    .main {
      flex: 1;
      padding: 2rem;
      background-color: #0a43ff;
      overflow-y: auto;
    }

  `],
  template: `
    <header class="app-header">
      <div class="app-title">🎲 Dungeon & Ecalora</div>
      <div class="auth-buttons">
        <ng-container *ngIf="!isConnected(); else logged">
          <a routerLink="/login" class="btn">Login</a>
          <a routerLink="/register" class="btn">Register</a>
        </ng-container>
        <ng-template #logged>
          <span class="user-role">{{ role() }}</span>
          <button (click)="logout()" class="btn">Logout</button>
        </ng-template>
      </div>
    </header>

    <nav class="app-nav">
      <ul class="menu-list">
        <li *ngFor="let item of items">
          <a *ngIf="item.routerLink" [routerLink]="item.routerLink" class="menu-link">
            {{ item.label }}
          </a>
          <a *ngIf="item.command" (click)="item.command()" class="menu-link">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="app-container">
      <aside [ngClass]="{
    'aside-gamemaster': role() === 'GameMaster',
    'aside-player': role() === 'Player'
  }">
      </aside>

      <main>
        <router-outlet />
      </main>
    </div>

  `
})
export class AppComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  items: { label: string; routerLink?: string; command?: () => void }[] = [];
  currentUser: WritableSignal<UserTokenDto | undefined>;
  isConnected: Signal<boolean>;
  role: Signal<string | undefined>;

  constructor() {
    this.currentUser = this._authService.currentUser;
    this.isConnected = computed(() => !!this.currentUser());
    this.role = computed(() => this.currentUser()?.user.role);

    effect(() => {
      this.items = [
        { label: 'Accueil', routerLink: '/home' },
        { label: 'Afficher', routerLink: '/affiche' },
        { label: 'Personnage', routerLink: '/personnage' },
        { label: 'Univers', routerLink: '/choixUniver' },
      ];

      if (this.isConnected()) {
        this.items.push({
          label: 'Logout',
          command: () => {
            this._authService.logout();
            this._router.navigate(['/']);
          }
        });

        if (this.role() === 'Player') {
          this.items.push({
            label: 'Rejoindre une partie',
            routerLink: '/waitingroom'
          },
          { label: 'Chat',
            routerLink: '/message'
          },);
        } else if (this.role() === 'GameMaster') {
          this.items.push(
            {
              label: 'Fiche de Personnage',
              routerLink: '/FichePerso',
            },
            { label: 'Chat',
              routerLink: '/message'
            },
          );
        }
      }
    });
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
