import { TestBed } from '@angular/core/testing';

import { AppEmitterService } from './app-emitter.service';

describe('AppEmitterService', () => {
  let service: AppEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
