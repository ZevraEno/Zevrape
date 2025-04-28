import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {RaceDto} from '../../models/RaceDto';
import {RaceService} from '../../services/Race.Service';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../auth/services/auth.services';


@Component({
  selector: 'app-race',
  templateUrl: './races.component.html',
  standalone: true,
  imports: [TableModule, PaginatorModule, FormsModule],
})
export class RacesComponent implements OnInit {
  races: RaceDto[] = [];
  first = 0;
  rows = 10;
  totalRaces = 0;
  rowsPerPageOptions = [5, 10, 20];

  private readonly _authService: AuthService = inject(AuthService);

  private readonly raceService = inject(RaceService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadRaces();
  }

  loadRaces(): void {
    this.raceService.findAll().subscribe({
      next: (data) => {
        this.races = data;
        this.totalRaces = data.length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des races :', error);
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  add(guideId: number): void {

  }

  update(raceId: number): void {
    this.router.navigate(['/races/edit', raceId]);
  }

  deleteById(raceId: number): void {
    this.raceService.deleteById(raceId).subscribe({
      next: () => {
        this.loadRaces();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la race :', error);
      },
    });
  }

  isAdmin() {
    return this._authService.currentUser()?.user.role === 'GameMaster';
  }
}
