<template>
  <v-container fill-height
               fluid
               class="pa-0"
               style="width:100%;">
    <v-layout align-center
              style="width:100%;">
      <v-flex xs12
              md4
              style="height:100%;">
        <v-card flat
                tile>
          <v-card-text class="py-5">
            <v-layout row
                      wrap
                      justify-center>
              <v-flex class="text-center"
                      shrink>
                <nuxt-link exact
                           tag="div"
                           to="/"
                           style="width:240px;"
                           class="hoverfinger">
                  <v-img src="/logo.png"
                         height="240px"
                         width="100%" />
                </nuxt-link>
                <h2 style="position:relative;top:-45px;">BoringBank</h2>
              </v-flex>
              <v-flex xs12>
                <div class="text-center mt-2">
                  <span class="mt-4 display-2">Log In</span>
                </div>
                <div class="text-center mt-4">
                  <span class="mt-4">
                    Need a BoringBank Account?
                    <nuxt-link to="/signup">Create an Account</nuxt-link>
                  </span>
                </div>
              </v-flex>

              <v-flex xs12>
                <user-login-form :loading="isLoading"
                                 @valid="onLoginFormValid" />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12
              md8
              class="hidden-sm-and-down relative billboard primary">
        <no-ssr>
          <v-card flat
                  dark
                  tile
                  color="transparent"
                  height="100vh">
            <div class="billboard-cta">
              <v-card-text class="text-center">
                <h1 class="headline mb-2">
                  Open a Rewards Savings Account Today!
                </h1>
                <p class="subtitle-1">
                  With a Rewards Savings account the more you save the more you could earn.
                </p>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn outlined>
                  Learn More
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </no-ssr>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="isErrorSnackbarVisible"
                left
                color="grey darken-4">
      {{ errorMessage }}
      <v-btn dark
             text
             @click="hideErrorSnackbar">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import _ from 'lodash';
import { IdentityVuexModule, IdentityActions } from '~/store/identity';
import { AuthenticateUserCommand } from '~/.types/api/boringbank-api';

@Component({
  middleware: ['anonymous'],
  components: {
    'user-login-form': () => import('~/components/forms/UserLoginForm.vue')
  }
})
export default class extends Vue {
  /**
   * Properties
   */
  /**
   * Vuex Bindings
   */
  @IdentityVuexModule.Action(IdentityActions.Login.Name)
  login: IdentityActions.Login.Type;
  /**
   * Watches
   */
  /**
   * Data
   */
  isErrorSnackbarVisible: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  /**
   * Computed
   */
  /**
   * Methods
   */
  showErrorSnackbar() {
    this.isErrorSnackbarVisible = true;
  }
  hideErrorSnackbar() {
    this.isErrorSnackbarVisible = false;
  }

  async onLoginFormValid(payload: AuthenticateUserCommand) {
    try {
      this.isLoading = true;
      await this.login(payload);
      this.$router.replace('/');
    } catch (error) {
      this.errorMessage = error && error.response ? error.response.data : error;
      this.showErrorSnackbar();
      this.isLoading = false;
    }
  }
  /**
   * Lifecycle Hooks
   */
}
</script>
<style lang="scss" scoped>
.relative {
  position: relative !important;
}

.billboard {
  height: 100vh;
  min-height: 1px;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  background: url('/undraw_Savings_dwkw.svg');
  background-position: bottom;
  background-size: auto 60%;
  background-repeat: no-repeat;
}

.billboard-cta {
  position: relative;
  top: 15vh;
}

.logo {
  flex: 0 0 60px;
}
</style>
