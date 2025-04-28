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
          icon: 'pi pi-home',
          routerLink: '/guide',
          routerLinkActiveOptions: {exact: true},
        },
        {
          label: 'Equipment',
          icon: 'pi pi-trophy',
          routerLink: '/equipment',
          routerLinkActiveOptions: {exact: false},
        },
        {
          label: 'Races',
          icon: 'pi pi-trophy',
          routerLink: '/race',
          routerLinkActiveOptions: {exact: false},
        },
        {
          label: 'Classes',
          icon: 'pi pi-trophy',
          routerLink: '/classe',
          routerLinkActiveOptions: {exact: false},
        },
        {
          label: 'Sorts et Competences',
          icon: 'pi pi-trophy',
          routerLink: '/spell',
          routerLinkActiveOptions: {exact: false},
        },
        {
          label: 'livre',
          icon: 'pi pi-trophy',
          routerLink: '/book',
          routerLinkActiveOptions: {exact: false},
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
              icon: 'pi pi-user',
              routerLink: '/FichePerso',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'lancer de dés',
              icon: 'pi pi-user',
              routerLink: '/dice',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Npc',
              icon: 'pi pi-user',
              routerLink: '/npc',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Quests',
              icon: 'pi pi-user-plus',
              routerLink: '/quest',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Items',
              icon: 'pi pi-user-plus',
              routerLink: '/item',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Creation Lore',
              icon: 'pi pi-user-plus',
              routerLink: '/lore',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Note',
              icon: 'pi pi-user-plus',
              routerLink: '/note',
              routerLinkActiveOptions: {exact: true},
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
              icon: 'pi pi-user',
              routerLink: '/dice',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Npc',
              icon: 'pi pi-user',
              routerLink: '/npc',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Quests',
              icon: 'pi pi-user-plus',
              routerLink: '/quest',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Items',
              icon: 'pi pi-user-plus',
              routerLink: '/item',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Creation Lore',
              icon: 'pi pi-user-plus',
              routerLink: '/lore',
              routerLinkActiveOptions: {exact: true},
            },
            {
              label: 'Note',
              icon: 'pi pi-user-plus',
              routerLink: '/note',
              routerLinkActiveOptions: {exact: true},
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
