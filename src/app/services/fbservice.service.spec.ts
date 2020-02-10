import {TestBed} from '@angular/core/testing';

import {FacebookOAuthService} from './facebook-o-auth.service';

describe('FBServiceService', () => {
  let service: FacebookOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookOAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
