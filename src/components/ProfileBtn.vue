<template>
  <q-btn-dropdown rounded color="primary" label="Account">
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Settings</div>
        <q-btn color="primary" label="Profile" push size="sm" @click="goTo('profile')" />
      </div>

      <q-separator vertical inset class="q-mx-lg" />

      <div class="column items-center">
        <q-avatar size="72px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">
          {{ props.user.username }}
        </div>

        <q-btn color="primary" @click="logout" label="Logout" push size="sm" v-close-popup />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup>
const props = defineProps({
  user: Object,
  goTo: Function,
  logout: Function
});
</script>
