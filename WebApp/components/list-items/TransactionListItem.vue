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
      <v-list-item-title>{{ formattedTransactionAmount }}</v-list-item-title>
      <v-list-item-subtitle>{{ formattedTransactionResultingBalance }}</v-list-item-subtitle>
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

  get formattedTransactionResultingBalance() {
    if (this.transaction == null) return '??.??';
    let formattedAmount = this.formatNumberAsUSD(
      this.transaction.resultingBalance
    );
    if (this.transaction.resultingBalance < 0)
      formattedAmount = `-${formattedAmount}`;
    return formattedAmount;
  }

  get formattedTransactionAmount() {
    if (this.transaction == null) return '??.??';
    let formattedAmount = this.formatNumberAsUSD(this.transaction.amount);
    if (this.transaction.type === TransactionType.Withdrawal)
      formattedAmount = `-${formattedAmount}`;
    return formattedAmount;
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