import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateTournamentFormComponent} from "../create-tournament-form/create-tournament-form.component";
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-create-tournament-button',
  templateUrl: './create-tournament-button.component.html',
  styleUrls: ['./create-tournament-button.component.scss']
})
export class CreateTournamentButtonComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  open() {
    const modalRef = this.modalService.open(CreateTournamentFormComponent);
  }

  ngOnInit(): void {
  }

}
