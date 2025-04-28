import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {DiceRollerComponent} from '../../../roll-dicer/page/roll-dicer/roll-dicer.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-game-interface',
  templateUrl: './game-interface.component.html',
  imports: [
    NgForOf,
    NgIf,
    DiceRollerComponent
  ],
  standalone: true
})
export class GameInterfaceComponent implements AfterViewInit{
  diceResult: number | null = null;

  @ViewChild(DiceRollerComponent) diceRollerComponent!: DiceRollerComponent;

  ngAfterViewInit() {
  }

  results: {
    label: string,
    rolls: number[],
    total: number
  }[] = [];

  triggerRollDice() {
    this.diceRollerComponent.rollDice();
  }
}
