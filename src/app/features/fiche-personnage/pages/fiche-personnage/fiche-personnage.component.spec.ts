import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePersonnageComponent } from './fiche-personnage.component';

describe('FichePersonnageComponent', () => {
  let component: FichePersonnageComponent;
  let fixture: ComponentFixture<FichePersonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichePersonnageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichePersonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
