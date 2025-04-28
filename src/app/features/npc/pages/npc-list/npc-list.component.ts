import { Component, OnInit } from '@angular/core';
import { NpcService, NPC } from '../../services/npc.service';


@Component({
  selector: 'app-npc-list',
  templateUrl: './npc-list.component.html',
  standalone: true,
  styleUrls: ['./npc-list.component.scss']
})
export class NpcListComponent implements OnInit {
  npcs: NPC[] = [];

  constructor(private npcService: NpcService) {}

  ngOnInit(): void {
    this.loadNpcs();
  }

  loadNpcs() {
    this.npcService.getAll().subscribe(data => {
      this.npcs = data;
    });
  }
}
