import {
  TransactionsHttpClient,
  UsersHttpClient
} from '~/.types/api/boringbank-api';

export default ({ app, $axios }, inject) => {
  const transactionsHttpClient = new TransactionsHttpClient(null, $axios);
  const usersHttpClient = new UsersHttpClient(null, $axios);
  inject('api', {
    transactions: transactionsHttpClient,
    users: usersHttpClient
  });
};
