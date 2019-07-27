import axios, { AxiosRequestConfig } from 'axios';
import { IdentityNamespace, IdentityGetters } from '~/store/identity';

export default function({ $axios, redirect, store }) {
  if (process.env.NODE_ENV !== 'production') {
    $axios.defaults.baseURL =
      process.env.baseUrl || process.env.API_URL || 'http://localhost:5000';
  }

  $axios.onRequest((config: AxiosRequestConfig) => {
    if (process.env.NODE_ENV !== 'production') {
      config.withCredentials = true;
    }

    let accessToken =
      store.getters[`${IdentityNamespace}/${IdentityGetters.GetAccessToken.Name}`];

    if (config.headers != null && config.headers['X-Requested-With'] == null) {
      config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + accessToken,
        ...config.headers
      };
    }
  });
  // $axios.onError((error: AxiosError) => {
  //   console.error(error);
  //   // const code = error.response != null ? parseInt(error.response && error.response.status) : 500;
  //   // if (code === 400) {
  //   //     redirect('/400');
  //   // }
  // });
}
