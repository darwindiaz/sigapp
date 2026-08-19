import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { farmRequiredGuard } from './farm-required.guard';

describe('farmRequiredGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => farmRequiredGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
