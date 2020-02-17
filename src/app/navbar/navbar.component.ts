import {Component, Input, OnInit} from '@angular/core';
import {SearchTournamentFlowService} from '../services/search-tournament-flow.service';
import {ArenaTournamentRepository} from '../domain/repositories/arena-tournament-repository';
import {flatMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLoggedIn;

  constructor(
    private searchTournamentFlowService: SearchTournamentFlowService,
    private repo: ArenaTournamentRepository,
    private router: Router
  ) {
  }

  onSearchTournamentTextChanged(text: string) {
    this.searchTournamentFlowService.publish(text);
  }

  ngOnInit(): void {
  }

  logout() {
    this.repo.logout()
      .pipe(
        flatMap((loggedOut) => this.router.navigateByUrl('login'))
      )
      .subscribe();
  }
}
