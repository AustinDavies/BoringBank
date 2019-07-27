import { GetterTree } from 'vuex';

import { IdentityState, Getters } from '.';
import { RootState } from '../index';

export const getters: GetterTree<IdentityState, RootState> = {
  [Getters.IsAuthenticated.Name](state): Getters.IsAuthenticated.Type {
    return !!state.accessToken;
  },
  [Getters.Profile.Name](state): Getters.Profile.Type {
    return state.profile;
  },
  [Getters.GetAccessToken.Name](state): Getters.GetAccessToken.Type {
    return state.accessToken;
  }
};

export default getters;
