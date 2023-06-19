import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: null,
    isLoggedIn: false,
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
        this.user = { role_name: "none" };
        console.error("Error loading new arrivals: ", error);
        return error;
      }
    },

    async login(credentials) {
      try {
        return await api.post("/login", credentials).then((res) => {
          this.user = res.data.user;
          this.token = res.data.token;
          this.isLoggedIn = true;
          return res;
        });
      } catch (error) {
        this.user = null;
        console.error("Error loading new arrivals: ", error);
        return error;
      }
    },

    async logout() {
      try {
        return api.post("logout").then((res) => {
          this.token = null;
          this.user = null;
          this.isLoggedIn = false;
          return res;
        });
      } catch (err) {
        console.error("Error loading new arrivals: ", err);
        return err;
      }
    },
  },
  persist: true,
});
