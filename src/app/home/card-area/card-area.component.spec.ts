import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAreaComponent } from './card-area.component';

describe('CardAreaComponent', () => {
  let component: CardAreaComponent;
  let fixture: ComponentFixture<CardAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
