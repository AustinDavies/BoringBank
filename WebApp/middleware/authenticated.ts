import { IdentityNamespace, IdentityGetters } from '~/store/identity';

export default async function({ redirect, store, fireAuth }) {
  let isAuthenticated =
    store.getters[
      `${IdentityNamespace}/${IdentityGetters.IsAuthenticated.Name}`
    ];
  if (!isAuthenticated) {
    return redirect('/login');
  }
}
