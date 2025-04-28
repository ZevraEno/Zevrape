import {Component, computed, effect, inject, Signal, WritableSignal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.services';
import {MenuItem} from 'primeng/api';
import {UserTokenDto} from '../../../auth/models/user-token-dto';
import {PanelMenu} from 'primeng/panelmenu';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-all-index',
  imports: [
    PanelMenu,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './all-index.component.html',
  standalone: true,
  styleUrl: './all-index.component.scss'
})
export class AllIndexComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  items: MenuItem[] = [];
  currentUser: WritableSignal<UserTokenDto | undefined>;
  isConnected: Signal<boolean>;
  role: Signal<string | undefined>;

  constructor() {
    this.currentUser = this._authService.currentUser;
    this.isConnected = computed(() => !!this.currentUser());
    this.role = computed(() => this.currentUser()?.user.role);
    effect(() => {
      this.items = [
        {
          label: 'Guide',
          routerLink: '/guide',
        },
        {
          label: 'Equipment',
          routerLink: '/equipment',
        },
        {
          label: 'Races',
          routerLink: '/race',
        },
        {
          label: 'Classes',
          routerLink: '/classe',
        },
        {
          label: 'Sorts et Competences',
          routerLink: '/spell',
        },
        {
          label: 'livre',
          routerLink: '/book',
        },
      ];
      if (this.isConnected()) {
        this.items = [
          ...this.items,

        ];
        if (this.role() === 'Player') {
          this.items = [
            ...this.items,
            {
              label: 'Fiche de Personnage',
              routerLink: '/FichePerso',
            },
            {
              label: 'lancer de dés',
              routerLink: '/dice',
            },
            {
              label: 'Npc',
              routerLink: '/npc',
            },
            {
              label: 'Quests',
              routerLink: '/quest',
            },
            {
              label: 'Items',
              routerLink: '/item',
            },
            {
              label: 'Creation Lore',
              routerLink: '/lore',
            },
            {
              label: 'Note',
              routerLink: '/note',
            }
          ];
        } else if (this.role() === 'GameMaster') {
          this.items = [
            ...this.items,
            {
              label: 'Lancer une partie',
              routerLink: '/waitingroom',
            },
            {
              label: 'lancer de dés',
              routerLink: '/dice',
            },
            {
              label: 'Npc',
              routerLink: '/npc',
            },
            {
              label: 'Quests',
              routerLink: '/quest',
            },
            {
              label: 'Items',
              routerLink: '/item',
            },
            {
              label: 'Creation Lore',
              routerLink: '/lore',
            },
            {
              label: 'Note',
              routerLink: '/note',
            }
          ];
        }
      } else {
        this.items = [
          ...this.items,


        ];
      }
    });
  }
}
