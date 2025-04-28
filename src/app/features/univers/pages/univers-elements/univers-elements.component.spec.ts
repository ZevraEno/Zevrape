import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversElementsComponent } from './univers-elements.component';

describe('UniversElementsComponent', () => {
  let component: UniversElementsComponent;
  let fixture: ComponentFixture<UniversElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
