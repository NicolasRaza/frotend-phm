import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedReservesComponent } from './purchased-reserves.component';

describe('PurchasedReservesComponent', () => {
  let component: PurchasedReservesComponent;
  let fixture: ComponentFixture<PurchasedReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedReservesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
