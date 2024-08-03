import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './profileinfo.component';

describe('ProfileComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
