import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDicerComponent } from './roll-dicer.component';

describe('RollDicerComponent', () => {
  let component: RollDicerComponent;
  let fixture: ComponentFixture<RollDicerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollDicerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollDicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
