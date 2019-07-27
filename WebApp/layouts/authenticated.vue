<template>
  <v-app>
    <v-app-bar app
               fixed
               collapse-on-scroll>
      <v-app-bar-nav-icon @click="$router.push('/')">
        <v-img contain
               height="52px"
               width="auto"
               src="/logo.png" />
      </v-app-bar-nav-icon>
      <v-toolbar-title>BoringBank</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x>
        <template v-slot:activator="{ on }">
          <v-btn icon
                 color="tertiary"
                 v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light"
                     alt="Austin">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ username }}</v-list-item-title>
                <v-list-item-subtitle>No notifications</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn target="_blank"
                       icon>
                  <v-icon>notifications</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch color="tertiary"></v-switch>
              </v-list-item-action>
              <v-list-item-title>Enable Something</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="tertiary"
                   text
                   @click="onLogoutClicked">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <template v-slot:extension>
        <v-tabs color="tertiary"
                align-with-title
                background-color="transparent">
          <v-tab nuxt
                 exact
                 to="/">Overview</v-tab>
          <v-tab nuxt
                 exact
                 to="/deposit">Deposit</v-tab>
          <v-tab nuxt
                 exact
                 to="withdraw">Withdraw</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import {
  IdentityVuexModule,
  IdentityActions,
  IdentityGetters,
  IdentityNamespace
} from '~/store/identity';
import { RootActions } from '../store';

@Component({
  middleware: ['authenticated']
})
export default class extends Vue {
  /**
   * Properties
   */
  /**
   * Vuex Bindings
   */
  @IdentityVuexModule.Action(IdentityActions.Logout.Name)
  logout: IdentityActions.Logout.Type;

  @IdentityVuexModule.Getter(IdentityGetters.Profile.Name)
  profile: IdentityGetters.Profile.Type;
  /**
   * Watches
   */
  /**
   * Data
   */
  /**
   * Computed
   */
  get username() {
    if (this.profile == null) return 'User';
    return this.profile.username;
  }
  /**
   * Methods
   */
  onLogoutClicked() {
    this.logout();
  }
  /**
   * Lifecycle Hooks
   */
}
</script>