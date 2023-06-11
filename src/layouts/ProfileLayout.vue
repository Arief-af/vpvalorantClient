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
      <div class="col-md-6 col-12 col-sm-6">
        <router-view />
      </div>
      <div class="col-auto col-sm-6">
        <q-table
          class="q-mt-xl"
          flat
          bordered
          title="Data Transaction&Checkout"
          :rows="transaction"
          :columns="columns"
          row-key="__index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "boot/axios";
import { ref } from "vue";
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";
const user = useAuth().user;
const goto = (name) => {
  router.push({
    path: name,
  });
};
const router = useRouter();
let transaction = ref([]);
const fetch = () => {
  api.get("checkout").then((res) => {
    transaction.value = res.data.data[0];
    console.log(transaction.value);
  });
};

fetch();
</script>

<style lang="sass">
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
