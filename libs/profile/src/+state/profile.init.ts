import { Profile } from './profile.interfaces';

export const profileInitialState: Profile = {
	username: '',
	bio: '',
	image: '',
	following: false,
	loading: false
};
