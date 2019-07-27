import {
  IdentityNamespace,
  IdentityGetters,
  SetUserMutationPayload,
  IdentityMutations
} from '~/store/identity';
import { sessionStorageSessionKey } from '~/package.json';

export default function({ redirect, store, route, app, req }) {
  // If nuxt generate, pass this middleware
  if (process.server && !req) return null;
  if (process.client) {
    const serializedSessionData = window.sessionStorage.getItem(
      sessionStorageSessionKey
    );
    if (!serializedSessionData) return null;
    let sessionData = JSON.parse(serializedSessionData);
    store.commit(`${IdentityNamespace}/${IdentityMutations.SetUser.Name}`, {
      accessToken: sessionData.accessToken,
      profile: {
        username: sessionData.username
      }
    });
  }
  return null;
}
