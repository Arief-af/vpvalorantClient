<template>
  <div class="content__wrapper">
    <header>
      <div class="q-pa-sm bg-negative text-center text-white">
        This only a demo website
      </div>
      <div class="navbar">
        <div class="navbar__title">VPValorant</div>
        <div class="navbar__toolbar">
          <a href="#topup" style="text-decoration: none">Top Up</a>
          <q-btn
            v-if="!user"
            to="/register"
            color="primary"
            rounded
            label="sign up"
          />
          <q-btn v-else to="/profile" color="primary" rounded label="profile" />
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
let data = new FormData();
data.append("id_role", 1);
api
  .get("roles/edit", { params: { id_role: 1 } })
  .then((res) => console.log(res));
</script>

<style lang="sass">
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
