<template>
  <v-container justify-center
               fill-height>
    <v-layout justify-center>
      <v-flex xs12
              sm6>
        <v-card height="100%">
          <v-layout column
                    fill-height>
            <v-flex shrink>
              <v-card-title>
                Account Overview
              </v-card-title>
              <v-card-text>
                <v-subtitle>Current Balance: {{ balance | usd }}</v-subtitle>
                <v-divider class="mt-3" />
              </v-card-text>
            </v-flex>
            <v-flex grow>
              <v-list two-line
                      v-if="hasTransactions">
                <v-subheader>Recent Transactions</v-subheader>
                <template v-for="(transaction, index) in orderedTransactions">
                  <v-divider v-if="index >= 1 || (index + 1) < transactions.length"
                             :key="`${transaction.transactionId}-divider`"></v-divider>
                  <transaction-list-item :key="transaction.transactionId"
                                         :transaction="transaction" />
                </template>
              </v-list>
              <v-layout fill-height
                        align-center
                        justify-center
                        v-else>
                <v-flex xs12
                        class="text-center">
                  <v-img max-height="250px"
                         contain
                         src="/undraw_void_3ggu.svg" />
                  <h2 class="mt-4">No Activity to Show</h2>
                  <p>Start by making a deposit.</p>
                  <v-btn text
                         nuxt
                         exact
                         to="/deposit"
                         color="secondary">Make Deposit</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { Action, Getter } from 'vuex-class';
import { RootGetters, RootActions } from '~/store/index';
import {
  TransactionLookupViewModel,
  TransactionType
} from '~/.types/api/boringbank-api';
import _ from 'lodash';

@Component({
  layout: 'authenticated',
  components: {
    'transaction-list-item': () =>
      import('~/components/list-items/TransactionListItem.vue')
  }
})
export default class extends Vue {
  /**
   * Properties
   */
  /**
   * Vuex Bindings
   */
  @Getter(RootGetters.GetTransactions.Name)
  transactions: RootGetters.GetTransactions.Type;
  @Getter(RootGetters.GetBalance.Name) balance: RootGetters.GetBalance.Type;
  @Action(RootActions.GetTransactions.Name)
  fetchTransactions: RootActions.GetTransactions.Type;
  @Action(RootActions.GetBalance.Name)
  fetchBalance: RootActions.GetBalance.Type;
  /**
   * Watches
   */
  /**
   * Data
   */
  /**
   * Computed
   */
  get orderedTransactions() {
    if (!this.hasTransactions) return null;
    return _.orderBy(this.transactions, x => x.timestamp, 'desc');
  }
  get hasTransactions() {
    return this.transactions != null && this.transactions.length > 0;
  }
  /**
   * Methods
   */

  /**
   * Lifecycle Hooks
   */
  async fetch({ store }) {
    await store.dispatch(RootActions.GetTransactions.Name);
    await store.dispatch(RootActions.GetBalance.Name);
  }
}
</script>