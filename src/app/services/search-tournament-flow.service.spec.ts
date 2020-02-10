import {TestBed} from '@angular/core/testing';

import {SearchTournamentFlowService} from './search-tournament-flow.service';

describe('SearchTournamentFlowService', () => {
  let service: SearchTournamentFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTournamentFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
