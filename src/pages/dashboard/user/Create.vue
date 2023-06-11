<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <div class="label">Create User</div>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="data.name" required type="text" label="name" />
        <q-input
          filled
          v-model="data.username"
          required
          type="text"
          label="Username"
        />
        <q-input
          filled
          v-model="data.email"
          required
          type="email"
          label="Email"
        />
        <q-input
          v-model="data.password"
          filled
          label="password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-select
          v-model="data.role_id"
          :options="options"
          label="Role"
          filled
        />
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
let isPwd = ref(true);

let options = ref([]);
const fetchRoles = () => {
  api.get("roles").then((res) => {
    const ResValue = res.data.data[0];
    const updatedData = ResValue.map((item) => {
      return {
        label: item.name,
        value: item.id_role,
      };
    });
    options.value = updatedData;
  });
};
fetchRoles();
const onSubmit = () => {
  api
    .post("/users/create", {
      name: data.value.name,
      email: data.value.email,
      username: data.value.username,
      password: data.value.password,
      name: data.value.name,
      role_id: data.value.role_id.value,
    })
    .then((res) => {
      data.value = {};
      $q.notify({
        message: res.data.message,
        position: "top-right",
        color: "primary",
      });
    });
};

const onReset = () => (data.value = {});
</script>

<style lang="scss" scoped>
.dashboard__content {
  background: rgb(228, 228, 228);
}
</style>
