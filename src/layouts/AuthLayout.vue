<template>
  <div class="content__wrapper">
   <Navbar />

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
import Navbar from '../components/Navbar.vue'
</script>


<style lang="sass">
.row > div
  padding: 10px 15px
.row + .row
  margin-top: 1rem
</style>
