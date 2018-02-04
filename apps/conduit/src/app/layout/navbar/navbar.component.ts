import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
	@Input() user: User;
	@Input() isLoggedIn: boolean;
}
