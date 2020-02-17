import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tournament-form',
  templateUrl: './create-tournament-form.component.html',
  styleUrls: ['./create-tournament-form.component.scss']
})
export class CreateTournamentFormComponent implements OnInit {
  games;
  participants;

  constructor(public activeModal: NgbActiveModal, private snackBar: MatSnackBar) {
  }

  createTournamentSubmit(title: string, participants: string, game: string, description: string) {
    console.log(title, participants, game, description);
    this.snackBar.open(`${title}, ${participants}, ${game}, ${description}`, "Submit",  {
      duration: 1000
    });
    this.activeModal.close('Close click');
  }


  ngOnInit(): void {
    this.games = ["OptionGame1", "OptionGame2", "OptionGame3"];
    this.participants = ["p16", "p32"]
  }
}

