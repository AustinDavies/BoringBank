<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>{{ transactionTypeIcon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ formattedTimestamp }}</v-list-item-title>
      <v-list-item-subtitle>Made a {{ transactionTypeName }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action-text>
      <v-list-item-title v-if="isWithdrawal">-{{ transactionAmount | usd }}</v-list-item-title>
      <v-list-item-title v-else>{{ transactionAmount | usd }}</v-list-item-title>
      <v-list-item-subtitle>{{ transactionResultingBalance | usd }}</v-list-item-subtitle>
    </v-list-item-action-text>
  </v-list-item>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import {
  TransactionLookupViewModel,
  TransactionType
} from '~/.types/api/boringbank-api';
import moment from 'moment';

@Component({
  name: 'TransactionListItemVue'
})
export default class extends Vue {
  /**
   * Properties
   */
  @Prop({ required: true, type: Object, default: () => null })
  transaction: TransactionLookupViewModel;

  /**
   * Vuex Bindings
   */

  /**
   * Watches
   */

  /**
   * Data
   */

  /**
   * Computed
   */
  get transactionTypeIcon() {
    if (this.transaction == null) return 'support';
    if (this.transaction.type === TransactionType.Deposit)
      return 'mdi-bank-transfer-in';
    else return 'mdi-bank-transfer-out';
  }

  get transactionResultingBalance() {
    if (this.transaction == null) return '??.??';
    return this.transaction.resultingBalance;
  }

  get transactionAmount() {
    if (this.transaction == null) return '??.??';
    return this.transaction.amount;
  }

  get isWithdrawal() {
    return (
      this.transaction != null &&
      this.transaction.type === TransactionType.Withdrawal
    );
  }

  get transactionId() {
    if (this.transaction == null) return 0;
    return this.transaction.transactionId;
  }

  get transactionTypeName() {
    if (this.transaction == null) return 'Unknown';
    return TransactionType[this.transaction.type];
  }

  get formattedTimestamp() {
    if (this.transaction == null) return 'Unknown';
    return moment(this.transaction.timestamp)
      .local()
      .format('MM/DD/YYYY');
  }

  /**
   * Methods
   */

  formatNumberAsUSD(value: number) {
    return `$${value.toFixed(2)}`;
  }

  /**
   * Lifecycle Hooks
   */
}
</script>