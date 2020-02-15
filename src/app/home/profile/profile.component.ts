import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from "../../snackbar/snackbar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackbar(provider: `Google` | `Facebook`) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: `Link with ${provider} account provided successfully`,
      duration: 500
    });
  }

  ngOnInit(): void {
  }
}
