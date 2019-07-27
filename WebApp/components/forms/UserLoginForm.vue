<template>
  <v-form>
    <v-container>
      <v-layout row
                wrap
                justify-center>
        <v-flex xs12
                sm8
                md9>
          <v-text-field :disabled="loading"
                        autofocus
                        v-model="username"
                        label="Username"
                        type="text"
                        data-vv-name="username"
                        v-validate="'required'"
                        :error-messages="errors.collect('username')"
                        required></v-text-field>
        </v-flex>
        <v-flex xs12
                sm8
                md9>
          <v-text-field @keyup.enter="submit"
                        :disabled="loading"
                        v-model="password"
                        label="Password"
                        type="password"
                        v-validate="'required'"
                        :error-messages="errors.collect('password')"
                        data-vv-name="password"
                        required></v-text-field>
        </v-flex>
        <v-flex xs12
                sm8
                md9>
          <v-btn :loading="loading"
                 :disabled="loading"
                 @click="submit"
                 large
                 color="primary"
                 block>
            Log In
          </v-btn>
        </v-flex>
      </v-layout>

    </v-container>
  </v-form>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';
import { AuthenticateUserCommand } from '~/.types/api/boringbank-api';

@Component({
  name: 'UserLoginFormVue'
})
export default class extends Vue {
  /**
   * Properties
   */
  @Prop({ required: false, type: Boolean, default: () => false })
  loading: boolean;
  /**
   * Vuex Bindings
   */
  /**
   * Watches
   */
  /**
   * Data
   */
  username: string = '';
  password: string = '';
  /**
   * Computed
   */
  /**
   * Methods
   */
  async submit() {
    let isValid = await this.$validator.validateAll();
    if (isValid) {
      let command: AuthenticateUserCommand = new AuthenticateUserCommand({
        username: this.username,
        password: this.password
      });
      this.$emit('valid', command);
    } else this.$emit('error');
  }
  /**
   * Lifecycle Hooks
   */
}
</script>