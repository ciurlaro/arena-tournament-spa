import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IsLoggedInUseCase} from './domain/usecases/login/is-logged-in-use-case';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  private sub: Subscription;

  constructor(public isLoggedInUseCase: IsLoggedInUseCase) {
  }

  ngOnInit(): void {
    this.sub = this.isLoggedInUseCase.buildAction()
      .subscribe((value) => this.isLoggedIn = value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
