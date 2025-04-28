import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import("./features/home/pages/home/home.component").then(m => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'dice',
    loadComponent: () => import('./features/roll-dicer/page/roll-dicer/roll-dicer.component').then(m => m.DiceRollerComponent),
  },
  {
    path: 'pnj',
    loadComponent: () => import('./features/npc/pages/npc-list/npc-list.component').then(m => m.NpcListComponent),
  },
  {
    path: 'affiche',
    loadComponent: () => import('./features/afficher/pages/all-index/all-index.component').then(m => m.AllIndexComponent),
  },
  {
    path: 'npclist',
    loadComponent: () => import('./features/npc/models/npc-form.component').then(m => m.NpcFormComponent),
  },
  {
    path: 'equipment',
    loadComponent: () => import('./features/equipment/pages/equipment/equipment.component').then(m => m.EquipmentComponent),
  },
  {
    path: 'quest',
    loadComponent: () => import('./features/quest/pages/quest/quest.component').then(m => m.QuestComponent),
  },
  {
    path: 'waitingroom',
    loadComponent: () => import('./features/games/pages/waiting-room/pages/waiting-room/waiting-room.component').then(m => m.WaitingRoomComponent),
  },
  {
    path: 'FichePerso',
    loadComponent: () => import('./features/fiche-personnage/pages/fiche-personnage/fiche-personnage.component').then(m => m.FichePersonnageComponent),
  },
  {
    path: 'Product',
    loadComponent: () => import('./features/product/pages/product/product.component').then(m => m.ProductComponent),
  },
  {
    path: 'all-products',
    loadComponent: () => import('./features/product/pages/product/product.component').then(m => m.ProductComponent),
  },
  {
    path: 'race',
    loadComponent: () => import('./features/races/pages/races/races.component').then(m => m.RacesComponent),
  },
  {
    path: 'interface',
    loadComponent: () => import('./features/games/pages/game-interface/game-interface.component').then(m => m.GameInterfaceComponent),
  },
  {
    path: 'book',
    loadComponent: () => import('./features/book/pages/book/book.component').then(m => m.BookComponent),
  },
  {
    path: 'guide',
    loadComponent: () => import('./features/guide/pages/guide/guide.component').then(m => m.GuideComponent),
  },
  {
    path: 'message',
    loadComponent: () => import('./features/message/pages/message/message.component').then(m => m.MessageComponent),
  },

];
