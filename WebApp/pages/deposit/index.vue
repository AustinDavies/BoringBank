<template>
  <v-container justify-center
               fill-height>
    <v-layout justify-center>
      <v-flex xs12
              sm6>
        <v-card>
          <v-layout column
                    fill-height>
            <v-flex shrink>
              <v-card-title>
                Make a Deposit
              </v-card-title>
              <v-card-text>
                <v-subtitle>Current Balance: {{ balance | usd }}</v-subtitle>
                <v-divider class="mt-3" />
                <v-layout style="margin-top:5rem;"
                          justify-center>
                  <v-flex xs12
                          sm6>
                    <v-text-field autofocus
                                  :min="0"
                                  data-vv-name="amount"
                                  v-validate="'required|min_value:0|numeric'"
                                  :error-messages="errors.collect('amount')"
                                  label="Amount"
                                  required
                                  v-model="amount"
                                  placeholder="$50.00"
                                  hint="Enter an amount to deposit"
                                  type="number"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
            <v-flex grow>
              <v-layout fill-height
                        align-end
                        justify-end>
                <v-flex shrink>
                  <v-card-text>
                    <v-btn nuxt
                           exact
                           to="/"
                           text
                           color="secondary">Cancel</v-btn>
                    <v-btn @click="onDepositClicked"
                           dark
                           rounded
                           color="tertiary">Make Deposit</v-btn>

                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog max-width="420px"
              v-model="isSuccessDialogVisible">
      <v-card>
        <v-card-text>
          <v-layout justify-center>
            <v-flex shrink
                    class="text-center">
              <v-icon color="success"
                      size="6rem">mdi-check-circle</v-icon>
              <h2>Success!</h2>
              <p>Your transaction was successful.</p>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <v-layout justify-center
                    row
                    wrap>
            <v-flex xs12>
              <v-btn nuxt
                     exact
                     to="/"
                     color="tertiary"
                     block
                     dark
                     rounded>Return to Overview</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn block
                     @click="isSuccessDialogVisible = false"
                     color="secondary"
                     text>Make Another Deposit</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="isErrorSnackbarVisible"
                left
                color="grey darken-4">
      {{ errorMessage }}
      <v-btn dark
             text
             @click="isErrorSnackbarVisible = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import { Action, Getter } from 'vuex-class';
import { RootActions, RootGetters } from '~/store/index';
import {
  CreateTransactionCommand,
  TransactionType
} from '~/.types/api/boringbank-api';

@Component({
  layout: 'authenticated'
})
export default class extends Vue {
  /**
   * Properties
   */
  /**
   * Vuex Bindings
   */
  @Action(RootActions.CreateTransaction.Name)
  createTransaction: RootActions.CreateTransaction.Type;

  @Getter(RootGetters.GetBalance.Name) balance: RootGetters.GetBalance.Type;
  @Getter(RootGetters.GetMostRecentTransaction.Name)
  mostRecentTransaction: RootGetters.GetMostRecentTransaction.Type;
  /**
   * Watches
   */
  /**
   * Data
   */
  amount: number = null;
  isSuccessDialogVisible: boolean = false;
  isErrorSnackbarVisible: boolean = false;
  errorMessage: any = null;
  /**
   * Computed
   */
  /**
   * Methods
   */
  reset() {
    this.amount = null;
    this.$validator.reset();
  }

  setErrorMessage(error: any) {
    if (error && error.response) this.errorMessage = error.response.data;
    else this.errorMessage = error;
  }

  async onDepositClicked() {
    let isValid = await this.$validator.validateAll();
    if (!isValid) return;
    try {
      let command = new CreateTransactionCommand({
        type: TransactionType.Deposit,
        amount: this.amount
      });
      await this.createTransaction(command);
      this.reset();
      this.isSuccessDialogVisible = true;
    } catch (err) {
      this.setErrorMessage(err);
      this.isErrorSnackbarVisible = true;
    }
  }
  /**
   * Lifecycle Hooks
   */
  async fetch({ store }) {
    await store.dispatch(RootActions.GetTransactions.Name);
    await store.dispatch(RootActions.GetBalance.Name);
  }
}
</script>