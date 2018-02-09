import { Component, OnInit } from '@angular/core';
import { AuthState } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Profile, ProfileState } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';
import * as fromProfile from './+state/profile.reducer';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	private profile$: Observable<Profile>;

	constructor(private store: Store<ProfileState>) { }

	ngOnInit() {
		this.profile$ = this.store.select(fromProfile.getProfile);
	}
}
