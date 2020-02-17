import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-choose-password',
  templateUrl: './choose-password.component.html',
  styleUrls: ['./choose-password.component.scss']
})
export class ChoosePasswordComponent implements OnInit {

  hide = true;
  password = '';
  confirmPassword = '';

  constructor(
    private dialogRef: MatDialogRef<ChoosePasswordComponent>
  ) {
  }

  ngOnInit(): void {
    this.dialogRef.close(this.password);
  }

}
