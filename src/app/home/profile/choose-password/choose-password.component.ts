import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-choose-password',
  templateUrl: './choose-password.component.html',
  styleUrls: ['./choose-password.component.scss']
})
export class ChoosePasswordComponent implements OnInit, OnDestroy {

  hide = true;
  password = '';
  confirmPassword = '';

  constructor(
    public dialogRef: MatDialogRef<ChoosePasswordComponent>
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dialogRef.close(this.password);
  }

}
