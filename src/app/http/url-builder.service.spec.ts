import {TestBed} from '@angular/core/testing';

import {CustomHttpRequestBuilderService} from './custom-http-request-builder.service';

describe('UrlBuilderService', () => {
  let service: CustomHttpRequestBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHttpRequestBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
