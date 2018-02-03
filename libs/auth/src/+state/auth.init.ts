import { Auth } from './auth.interfaces';

export const authInitialState: Auth = {
	loggedIn: false,
	status: 'INIT',
	user: {
		email: '',
		token: '',
		username: '',
		bio: '',
		image: ''
	}
};
