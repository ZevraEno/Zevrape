import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixUniversComponent } from './choix-univers.component';

describe('ChoixUniversComponent', () => {
  let component: ChoixUniversComponent;
  let fixture: ComponentFixture<ChoixUniversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoixUniversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixUniversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
