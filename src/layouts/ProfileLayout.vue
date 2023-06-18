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
import { api } from "boot/axios";
import { ref } from "vue";
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
