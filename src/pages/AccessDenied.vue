<template>
  <div class="text-h5 fixed bg-dark text-white fixed-center">
    <div class="text-center">
      <div class="q-mb-md">Access Denied</div>
      <q-btn color="primary" icon="undo" label="Back To Previous Page" @click="onBack" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()
const onBack = () => {
    router.back()
}
</script>

<style>
body {
  background: #1d1d1d;
}
</style>
