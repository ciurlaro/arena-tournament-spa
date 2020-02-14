import {TestBed} from '@angular/core/testing';

import {AuthFlowService} from './auth-flow.service';

describe('AuthFlowService', () => {
  let service: AuthFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
