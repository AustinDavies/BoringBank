import { MutationTree } from 'vuex';
import { IdentityState, Mutations, SetUserMutationPayload } from '.';

export const mutations: MutationTree<IdentityState> = {
  [Mutations.SetUser.Name](state, payload: SetUserMutationPayload) {
    state.accessToken = payload.accessToken;
    state.profile = payload.profile;
  }
};
export default mutations;
