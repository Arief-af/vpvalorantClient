import { defineStore } from "pinia";
import { api } from "boot/axios";
export const useAuth = defineStore("auth", {
  state: () => ({
    user: 0,
    isAuthenticated: false,
    token: null,
  }),

  actions: {
    async register(credentials) {
      try {
        await api
          .post("register", credentials)
          .then((response) => {
            console.info(response);
          })
          .catch((err) => console.info("register error ", err));
      } catch (error) {
        this.user = {role_name: 'none'};
        console.error("Error loading new arrivals : ", error);
        return error;
      }
    },

    async login(credentials) {
      try {
        await api.post("/login", credentials).then((res) => {
          console.log(res);
          (this.user = res.data.user),
            (this.token = res.data.token),
            (this.isAuthenticated = true);
        });
      } catch (error) {
        this.user = null;
        console.error("Error loading new arrivals : ", error);
        return error;
      }
    },

    async logout() {
      try {
        this.token = false;
        this.user = null;
        this.isAuthenticated = false;
        router.push({
          path: '/login'
        })
      } catch (err) {
        console.error("Error loading new arrivals : ", err);
        return err;
      }
    },
  },
  persist: true,
});
