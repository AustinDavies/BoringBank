import Vuex, { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import {
  ITransactionsHttpClient,
  IUsersHttpClient
} from '../api/boringbank-api';
import VueRouter from 'vue-router';

declare module 'vuex' {
  interface Store<S> {
    $router: VueRouter;
    $axios: NuxtAxiosInstance;
    $api: {
      users: IUsersHttpClient;
      transactions: ITransactionsHttpClient;
    };
  }
}
