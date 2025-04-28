import { Component } from '@angular/core';
import {NPC, NpcService} from '../services/npc.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-npc-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './npc-form.component.html'
})
export class NpcFormComponent {
  newNpc: NPC = {
    name: '',
    description: '',
    race: '',
    role: '',
    classe: '',
    level: 1
  };

  constructor(private npcService: NpcService, private router: Router) {}

  createNPC(): void {
    this.npcService.create(this.newNpc).subscribe(() => {
      this.router.navigate(['/pnj']);
      this.newNpc = {
        name: '',
        description: '',
        race: '',
        role: '',
        classe: '',
        level: 1
      };
      alert('NPC créé !');
    });
  }
}
