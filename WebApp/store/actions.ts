import { ActionTree } from 'vuex';
import { RootState, Actions, Mutations } from './index';
import {
  CreateTransactionCommand,
  TransactionLookupViewModel
} from '~/.types/api/boringbank-api';

export const actions: ActionTree<RootState, RootState> = {
  async [Actions.CreateTransaction.Name](
    { commit },
    command: CreateTransactionCommand
  ) {
    let response = await this.$api.transactions.createTransaction(command);
    let mutationPayload: TransactionLookupViewModel = new TransactionLookupViewModel(
      {
        amount: response.amount,
        resultingBalance: response.newBalance,
        timestamp: response.timestamp,
        transactionId: response.transactionId,
        type: response.type
      }
    );
    commit(Mutations.AddTransaction.Name, mutationPayload);
  },
  async [Actions.GetTransactions.Name]({ commit, dispatch }) {
    let response = await this.$api.transactions.getTransactions();
    commit(Mutations.SetTransactions.Name, response.transactions);
  },
  async [Actions.GetBalance.Name]({ commit }) {
    let response = await this.$api.users.getBalance();
    commit(Mutations.SetBalance.Name, response.balance);
  }
};
export default actions;
