import { homeFeature } from './home.reducer';

export const { selectHomeState, selectTags } = homeFeature;
export const homeQuery = {
  selectHomeState,
  selectTags,
};
