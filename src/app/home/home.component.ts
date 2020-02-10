import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchTournamentFlowService} from '../services/search-tournament-flow.service';
import {Subscription} from 'rxjs';
import {TournamentEntity} from '../domain/entities/tournament-entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  tournaments: TournamentEntity[] = [];
  private searchSub: Subscription;

  constructor(
    private searchTournamentFlowService: SearchTournamentFlowService
  ) {
  }

  ngOnInit(): void {
    this.searchSub = this.searchTournamentFlowService.getFlow()
      .subscribe((searchText) => {
        console.log(`message from search is: ${searchText}`);
        if (searchText.length === 0) {

        } else {

        }
      });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

}
