<template>
  <div class="content__wrapper">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
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
