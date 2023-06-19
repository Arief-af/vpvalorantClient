<template>
  <div class="content__wrapper">
    <Navbar />

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
import Navbar from "../components/Navbar.vue";
import { api } from "boot/axios";
import { ref } from "vue";
let transaction = ref([]);
import { useAuth } from "stores/auth";
const store = useAuth();
const fetch = () => {
  api
    .get("checkout/user", { params: { user_id: store.user.id_user } })
    .then((res) => {
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
