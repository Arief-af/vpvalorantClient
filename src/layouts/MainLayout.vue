<template>
  <div class="content__wrapper">
    <header>
      <div class="q-pa-sm bg-negative text-center text-white">
        This only a demo website
      </div>
      <div class="navbar">
        <div class="navbar__title">VPValorant</div>
        <div class="navbar__toolbar">
          <a @click="goto('/topup')" style="text-decoration: none; cursor: pointer">Top Up</a>
          <a @click="goto('/')" style="text-decoration: none; cursor: pointer">Home</a>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { useAuth } from "stores/auth";
const user = useAuth().user
import { api } from "boot/axios";
import { useRouter } from "vue-router";
let data = new FormData();
const router  = useRouter()
const goto = (name) => {
  router.push({
    path: name
  })
}
</script>

<style lang="sass">
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
