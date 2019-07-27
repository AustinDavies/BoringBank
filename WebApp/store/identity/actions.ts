import { ActionTree } from 'vuex';
import {
  IdentityState,
  Actions,
  UserProfile,
  IdentityMutations,
  IdentityActions,
  SetUserActionPayload,
  SetUserMutationPayload
} from '.';
import { RootState, RootMutations } from '../index';
import {
  UserAuthenticationResponse,
  CreateUserCommand,
  AuthenticateUserCommand
} from '~/.types/api/boringbank-api';
import { sessionStorageSessionKey } from '~/package.json';

export const actions: ActionTree<IdentityState, RootState> = {
  async [Actions.CreateUserWithUsernameAndPassword.Name](
    { dispatch },
    command: CreateUserCommand
  ) {
    let response = await this.$api.users.createUser(command);
    dispatch(Actions.SetUser.Name, <SetUserActionPayload>{
      accessToken: response.accessToken,
      username: command.username
    });
    return response;
  },

  async [Actions.Login.Name](
    { dispatch, commit },
    command: AuthenticateUserCommand
  ) {
    if (command == null)
      throw new Error('Authentication credentials cannot be null');

    let response: UserAuthenticationResponse = null;
    try {
      response = await this.$api.users.authenticate(command);
      const setUserPayload: SetUserActionPayload = {
        accessToken: response.accessToken,
        username: command.username
      };
      if (process.client && !!window)
        window.sessionStorage.setItem(
          sessionStorageSessionKey,
          JSON.stringify(setUserPayload)
        );
      dispatch(Actions.SetUser.Name, <SetUserActionPayload>{});
    } catch (error) {
      dispatch(IdentityActions.Logout.Name);
      throw error;
    }
    return response;
  },

  async [Actions.SetUser.Name]({ commit }, payload: SetUserActionPayload) {
    if (process.server) return;
    let profile: UserProfile = null;
    let accessToken: string = null;
    if (!!payload) {
      profile = {
        username: payload.username
      };
      accessToken = payload.accessToken;
    }
    commit(IdentityMutations.SetUser.Name, <SetUserMutationPayload>{
      accessToken,
      profile
    });
  },

  async [Actions.Logout.Name]({ dispatch, commit }, redirect: boolean = true) {
    commit(RootMutations.Logout.Name, null, { root: true });
    if (process.client && !!window)
      window.sessionStorage.removeItem(sessionStorageSessionKey);
    await dispatch(Actions.SetUser.Name, null);
    if (redirect) this.$router.push('/login');
  }
};
export default actions;
