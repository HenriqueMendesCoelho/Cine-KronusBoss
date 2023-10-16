import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useUserStore } from 'src/stores/UserStore';
import { Cookies } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app, ssrContext }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  axios.interceptors.request.use(
    (request) => {
      const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
      const token = cookies.get('auth-kb');

      if (token) {
        const userStore = useUserStore();
        request.headers['Authorization'] = `Bearer ${token}`;
        userStore.user.isLoged = true;
      }

      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403) {
        const userStore = useUserStore();
        userStore.showDialogLogin = true;
        userStore.user.isLoged = false;
      }
      return Promise.reject(error);
    }
  );
});

export { api };
