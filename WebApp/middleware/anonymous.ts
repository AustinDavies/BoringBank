import { IdentityNamespace, IdentityGetters } from '~/store/identity';

export default function({ redirect, store, route, app }) {
  let isAuthenticated =
    store.getters[
      `${IdentityNamespace}/${IdentityGetters.IsAuthenticated.Name}`
    ];
  if (isAuthenticated) {
    return redirect('/');
  }
}
