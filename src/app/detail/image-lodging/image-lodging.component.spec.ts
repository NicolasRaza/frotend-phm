import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLodgingComponent } from './image-lodging.component';

describe('ImageLodgingComponent', () => {
  let component: ImageLodgingComponent;
  let fixture: ComponentFixture<ImageLodgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageLodgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageLodgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
