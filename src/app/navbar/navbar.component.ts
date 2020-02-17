import {Component, Input, OnInit} from '@angular/core';
import {SearchTournamentFlowService} from "../services/search-tournament-flow.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isLoggedIn;

  constructor(
    private searchTournamentFlowService: SearchTournamentFlowService) {
  }

  onSearchTournamentTextChanged(text: string) {
    this.searchTournamentFlowService.publish(text);
  }

  ngOnInit(): void {
  }

}
