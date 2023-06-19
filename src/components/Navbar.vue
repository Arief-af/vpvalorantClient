<template>
  <header>
    <div class="q-pa-sm bg-negative text-center text-white">
      This only a demo website
    </div>
    <div class="navbar">
      <div class="navbar__title">VPValorant</div>
      <div class="navbar__toolbar">
        <a
          v-for="navLink in navbarLink"
          :key="navLink"
          @click="goTo(navLink.link)"
          style="text-decoration: none; cursor: pointer"
          >{{ navLink.label }}
        </a>
        <profile-btn :logout="logout" :goTo="goTo" :user="user" v-if="user" />
        <q-btn v-else color="primary" label="Login" @click="goTo('login')" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { api } from "boot/axios";
import { ref } from "vue";
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";
import ProfileBtn from "./ProfileBtn.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();
const store = useAuth();
const user = store.user;
const navbarLink = ref([
  {
    label: "home",
    link: "home",
  },
  {
    label: "topup",
    link: "topup",
  },
]);

const goTo = (name) => {
  router.push({
    name: name,
  });
};
const logout = () => {
  store.logout().then((res) => {
    $q.notify({
      message: res.data.message,
      color: "primary",
      position: "top-right",
    });
    router.push({
      path: "/login",
    });
  });
};
</script>

<style lang="sass">
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
