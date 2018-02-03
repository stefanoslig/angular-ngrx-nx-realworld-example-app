import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthState } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.store.dispatch({
      type: '[auth] GET_USER'
    });
  }
}
