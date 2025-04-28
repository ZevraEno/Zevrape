import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-roll-dicer',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './roll-dicer.component.html',
  standalone: true,
  styleUrl: './roll-dicer.component.scss'
})
export class DiceRollerComponent {
  diceTypes = [
    { key: 'd2', sides: 2, label: 'Dé à 2 faces' },
    { key: 'd4', sides: 4, label: 'Dé à 4 faces' },
    { key: 'd6', sides: 6, label: 'Dé à 6 faces' },
    { key: 'd8', sides: 8, label: 'Dé à 8 faces' },
    { key: 'd10', sides: 10, label: 'Dé à 10 faces' },
    { key: 'd12', sides: 12, label: 'Dé à 12 faces' },
    { key: 'd20', sides: 20, label: 'Dé à 20 faces' },
    { key: 'd100', sides: 100, label: 'Dé à 100 faces' }
  ];

  diceForm: Record<string, number> = {
    d2: 0, d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0
  };

  results: {
    label: string,
    rolls: number[],
    total: number
  }[] = [];

  rollDice() {
    this.results = [];

    for (let die of this.diceTypes) {
      const count = this.diceForm[die.key];
      const rolls = [];
      for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * die.sides) + 1);
      }
      if (rolls.length > 0) {
        this.results.push({
          label: die.label,
          rolls,
          total: rolls.reduce((a, b) => a + b, 0)
        });
      }
    }
  }
}
