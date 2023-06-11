<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <div class="label">Create Voucher</div>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input required filled v-model="data.amount" type="text" label="Amount" />
        <q-input required filled v-model="data.price" type="text" label="Price" />
  
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
  api
    .post("/vouchers/create", {
      amount: data.value.amount,
      price: data.value.price,
    })
    .then((res) => {
      data.value = {}
      $q.notify({
        message: res.data.message,
        position: "top-right",
        color: "primary",
      });
    });
};
</script>

<style lang="scss" scoped>
.dashboard__content {
  background: rgb(228, 228, 228);
}
</style>
