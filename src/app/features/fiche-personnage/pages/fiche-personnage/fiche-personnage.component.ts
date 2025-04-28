import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-character-sheet-creator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Button,
    InputText,
    CardModule
  ],
  template: `
    <p-card header="Créer une fiche de personnage">
      <form [formGroup]="sheetForm" (ngSubmit)="saveSheet()">
        <div formArrayName="fields">
          <div *ngFor="let field of fields.controls; let i = index" [formGroupName]="i">
            <input pInputText formControlName="label" placeholder="Nom du champ" />
            <select formControlName="type">
              <option value="text">Texte</option>
              <option value="number">Nombre</option>
              <option value="textarea">Texte long</option>
            </select>
            <button pButton type="button" icon="pi pi-times" (click)="removeField(i)"></button>
          </div>
        </div>
        <button pButton type="button" label="Ajouter un champ" (click)="addField()"></button>
        <button pButton type="submit" label="Enregistrer"></button>
      </form>
    </p-card>
  `,
})
export class FichePersonnageComponent {
  sheetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sheetForm = this.fb.group({
      fields: this.fb.array([])
    });
  }

  get fields() {
    return this.sheetForm.get('fields') as FormArray;
  }

  addField() {
    this.fields.push(this.fb.group({
      label: '',
      type: 'text'
    }));
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  saveSheet() {
    const sheetData = this.sheetForm.value;
    console.log('Fiche à sauvegarder :', sheetData);
  }
}
