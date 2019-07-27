import Vue from 'vue';
import Router, { Route } from 'vue-router';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { VuetifyObject } from 'vuetify';
import {
  ITransactionsHttpClient,
  IUsersHttpClient
} from '../api/boringbank-api';
import { ErrorBag, FieldBag } from 'vee-validate';

declare module 'vue/types/vue' {
  interface Vue {
    fields: FieldBag;
    errors: ErrorBag;
    $axios: NuxtAxiosInstance;
    $route: Route;
    $router: Router;
    // $vuetify: VuetifyObject;;
    $api: {
      users: IUsersHttpClient;
      transactions: ITransactionsHttpClient;
    };
  }
}
