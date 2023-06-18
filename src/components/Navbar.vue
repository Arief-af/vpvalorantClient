<template>
  <header>
    <div class="q-pa-sm bg-negative text-center text-white">
      This only a demo website
    </div>
    <div class="navbar">
      <div class="navbar__title">VPValorant</div>
      <div class="navbar__toolbar">
        <a
          @click="goto('/topup')"
          style="text-decoration: none; cursor: pointer"
          >Top Up</a
        >
        <a @click="goto('/')" style="text-decoration: none; cursor: pointer"
          >Home</a
        >
        <q-btn color="primary" label="Login" @click="goto('/login')" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { api } from "boot/axios";
import { ref } from "vue";
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const user = useAuth().user;
const goto = (name) => {
  router.push({
    path: name,
  });
};
</script>

<style lang="sass">
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
