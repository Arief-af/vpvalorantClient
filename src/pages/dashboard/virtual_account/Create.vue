<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <div class="label">Create Voucher</div>
      {{ data }}
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input v-model="data.name" type="text" label="name" />
        <div v-if="errors.name" class="text-red q-my-sm">
          {{ errors.name[0] }}
        </div>

        <div class="float-right">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "boot/axios";
import { ref } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
let data = ref({});
let errors = ref({});

const onSubmit = () => {
  api.post("/vouchers/create",{
    name: data.value.name,
  }).then((res) => {
    data.value = {},
    $q.notify({
      message: res.data.message
    })
  });
};

const onReset = () => {
  data.value = {}
}
</script>

<style lang="scss" scoped>
.dashboard__content {
  background: rgb(228, 228, 228);
}
</style>
