<template>
  <v-container fill-height
               fluid
               class="white">
    <v-layout align-center
              justify-center
              wrap>

      <v-flex xs12
              md8
              lg10>
        <div>
          <v-layout row
                    wrap
                    justify-center>
            <v-flex xs12
                    md5>
              <v-img contain
                     max-height="50vh"
                     height="100%"
                     src="/undraw_mobile_login_ikmv.png" />
            </v-flex>
            <v-flex xs12
                    sm10
                    md7
                    class="align-self-center">
              <v-card flat>
                <v-card-text class="text-center">
                  <h1 class="font-weight-bold mb-3">Create your account</h1>
                  <p class="subheading">Let's get started with setting up your account.</p>
                  <v-form>
                    <v-layout row
                              wrap
                              justify-center>
                      <v-flex xs12
                              md8>
                        <v-text-field autofocus
                                      v-model="username"
                                      v-validate="'required'"
                                      :error-messages="usernameFieldErrorMessages"
                                      label="Username"
                                      data-vv-name="username"
                                      required></v-text-field>
                      </v-flex>
                      <v-flex xs12
                              md8>
                        <v-text-field @keypress.enter="onSignUpWithUsernameAndPassword"
                                      v-model="password"
                                      v-validate="'required'"
                                      :error-messages="passwordFieldErrorMessages"
                                      label="Password"
                                      type="password"
                                      data-vv-name="password"
                                      required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-divider class="hidden-sm-and-down"
                     style="margin-top:2rem;margin-bottom:4rem;" />
          <v-layout row
                    wrap
                    justify-center>
            <v-flex xs12
                    sm6
                    md4
                    class="text-center">
              <div class="">
                <v-btn large
                       :loading="isLoading"
                       rounded
                       :disabled="isLoading"
                       block
                       color="primary"
                       class="mx-auto"
                       @click="onSignUpWithUsernameAndPassword">Create Account</v-btn>
              </div>
            </v-flex>
          </v-layout>
          <div class="text-center mt-3">
            <p class="body-1 mb-0">Already have an account?</p>
            <v-btn nuxt
                   to="/login"
                   text
                   small
                   color="primary">Sign In</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="isErrorSnackbarVisible"
                color="error">
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
import { IdentityVuexModule, IdentityActions } from '~/store/identity';
import { CreateUserCommand } from '~/.types/api/boringbank-api';

@Component({
  middleware: ['anonymous']
})
export default class extends Vue {
  /**
   * Properties
   */

  /**
   * Vuex Bindings
   */
  @IdentityVuexModule.Action(
    IdentityActions.CreateUserWithUsernameAndPassword.Name
  )
  createUserWithUsernameAndPassword: IdentityActions.CreateUserWithUsernameAndPassword.Type;

  /**
   * Watches
   */

  /**
   * Data
   */
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  isErrorSnackbarVisible: boolean = false;
  errorMessage: string = '';

  /**
   * Computed
   */

  get usernameFieldErrorMessages() {
    return this.errors.collect('username');
  }

  get passwordFieldErrorMessages() {
    return this.errors.collect('password');
  }

  /**
   * Methods
   */
  showError(error: any) {
    if (error && error.response) this.errorMessage = error.response.data;
    else this.errorMessage = error;
    this.isErrorSnackbarVisible = true;
  }

  async onSignUpWithUsernameAndPassword() {
    if (this.isLoading) return;
    try {
      this.isLoading = true;
      let isValid = await this.$validator.validateAll();
      if (!isValid) return;
      await this.createUserWithUsernameAndPassword(
        new CreateUserCommand({
          username: this.username,
          password: this.password
        })
      );
      this.$router.push('/');
    } catch (err) {
      this.isLoading = false;
      console.error(err);
      this.showError(err.response.data);
    }
  }

  /**
   * Lifecycle Hooks
   */
}
</script>