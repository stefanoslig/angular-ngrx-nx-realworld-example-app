import { Auth } from './auth.interfaces';

export const authInitialState: Auth = {
	loggedIn: false,
	user: {
		email: '',
		token: '',
		username: '',
		bio: '',
		image: ''
	}
};
