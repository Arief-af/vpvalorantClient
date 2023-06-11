<template>
  <div class="content__wrapper">
    <header>
      <div class="q-pa-sm bg-negative text-center text-white">
        This only a demo website
      </div>
      <div class="navbar">
        <div class="navbar__title">VPValorant</div>
        <div class="navbar__toolbar">
            <a @click="goto('/topup')" style="text-decoration: none">Top Up</a>
        </div>
      </div>
    </header>

    <div class="hero row justify-between items-center q-pa-30">
      <div class="col-auto col-sm-6">
        <img class="hero__img" src="/img/hero.png" alt="" srcset="" />
      </div>
      <div class="col-md-6 col-12 col-sm-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";
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
