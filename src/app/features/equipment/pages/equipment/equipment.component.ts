import {Component, inject} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {RaceDto} from '../../../races/models/RaceDto';
import {RaceService} from '../../../races/services/Race.Service';
import {Router} from '@angular/router';
import {EquipmentDto} from '../../models/EquipmentDto';
import {EquipmentService} from '../../services/Equipment.Service';
import {AuthService} from '../../../auth/services/auth.services';

@Component({
  selector: 'app-equipment',
  imports: [
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './equipment.component.html',
  standalone: true,
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {
  equipments: EquipmentDto[] = [];
  first = 0;
  rows = 10;
  totalEquipments = 0;
  rowsPerPageOptions = [5, 10, 20];

  private readonly _authService: AuthService = inject(AuthService);

  private readonly equipmentService = inject(EquipmentService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.equipmentService.findAll().subscribe({
      next: (data) => {
        this.equipments = data;
        this.totalEquipments = data.length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des equipments :', error);
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  add(guideId: number): void {

  }

  update(equipmentId: number): void {
    this.router.navigate(['/equipments/edit', equipmentId]);
  }

  deleteById(equipmentId: number): void {
    this.equipmentService.deleteById(equipmentId).subscribe({
      next: () => {
        this.loadEquipments();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l equipment :', error);
      },
    });
  }

  isAdmin() {
    return this._authService.currentUser()?.user.role === 'GameMaster';
  }
}
