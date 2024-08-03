import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigCardComponent } from './dig-card.component';

describe('DigCardComponent', () => {
  let component: DigCardComponent;
  let fixture: ComponentFixture<DigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
