import { profileFeature } from './profile.reducer';

export const { selectProfileState, selectBio, selectLoading, selectFollowing, selectImage, selectUsername } =
  profileFeature;

export const profileQuery = {
  selectProfileState,
  selectBio,
  selectLoading,
  selectFollowing,
  selectImage,
  selectUsername,
};
