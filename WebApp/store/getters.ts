import { GetterTree } from 'vuex';
import { RootState, Getters } from './index';

export const getters: GetterTree<RootState, RootState> = {
  [Getters.CurrentYear.Name](): number {
    return new Date().getUTCFullYear();
  },
  [Getters.GetBalance.Name](state): number {
    return state.balance;
  },
  [Getters.GetTransactions.Name](state) {
    return state.transactions;
  },
  [Getters.GetMostRecentTransaction.Name](state) {
    if (state.transactions == null) return null;
    if (state.transactions.length === 0) return null;
    return state.transactions[0];
  }
};
export default getters;
