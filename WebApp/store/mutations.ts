import { MutationTree } from 'vuex';
import { RootState, Mutations } from './index';
import { TransactionLookupViewModel } from '~/.types/api/boringbank-api';

export const mutations: MutationTree<RootState> = {
  [Mutations.SetBalance.Name](state, balance: number) {
    state.balance = balance;
  },
  [Mutations.SetTransactions.Name](
    state,
    transactions: TransactionLookupViewModel[]
  ) {
    if (transactions == null) state.transactions = [];
    state.transactions = transactions;
  },
  [Mutations.AddTransaction.Name](
    state,
    transaction: TransactionLookupViewModel
  ) {
    if (transaction == null) return;
    if (state.transactions == null) state.transactions = [];
    state.transactions.push(transaction);
    state.balance = transaction.resultingBalance;
  },
  [Mutations.Logout.Name](state) {
    state.balance = 0;
    state.transactions = [];
  }
};
export default mutations;
