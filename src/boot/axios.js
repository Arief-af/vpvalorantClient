import { boot } from "quasar/wrappers";
import axios from "axios";
import { useAuth } from "src/stores/auth";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default boot(({ app }) => {
  const authStore = useAuth();
  // Listen for 'login' event
  
  // for use inside Vue files (Options API) through this.$axios and this.$api
  
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  
  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.request.use(
    (config) => {
      if (authStore.token) {
        console.log(`Bearer ${authStore.token}`);
        config.headers["Authorization"] = `Bearer ${authStore.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
});

export { api };
