import {Component, inject} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Router} from '@angular/router';
import {GuideService} from '../../services/GuideService';
import {GuideDto} from '../../models/GuideDto';
import {AuthService} from '../../../auth/services/auth.services';

@Component({
  selector: 'app-guide',
  imports: [
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {
  guides: GuideDto[] = [];
  first = 0;
  rows = 10;
  totalGuides = 0;
  rowsPerPageOptions = [5, 10, 20];

  private readonly _authService: AuthService = inject(AuthService);

  private readonly guideService = inject(GuideService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.loadGuides();
  }

  loadGuides(): void {
    this.guideService.findAll().subscribe({
      next: (data) => {
        this.guides = data;
        this.totalGuides = data.length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des guides :', error);
      },
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  add(guideId: number): void {

  }

  update(guideId: number): void {
    this.router.navigate(['/guides/edit', guideId]);
  }

  deleteById(guideId: number): void {
    this.guideService.deleteById(guideId).subscribe({
      next: () => {
        this.loadGuides();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du guide :', error);
      },
    });
  }
  isAdmin() {
    return this._authService.currentUser()?.user.role === 'GameMaster';
  }
}
