<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <q-table
        class="q-mt-xl"
        flat
        bordered
        title="Data Users"
        :rows="users"
        :columns="columns"
        row-key="__index"
      >
        <!-- action components -->
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              flat
              round
              color="red"
              icon="delete"
              @click="destroy(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
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

const columns = [
  {
    name: "id_user",
    align: "center",
    label: "id_user",
    field: "id_user",
    sortable: true,
    classes: "text-dark",
  },

  {
    name: "name",
    align: "left",
    label: "name",
    field: "name",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "email",
    field: "email",
    sortable: true,
  },
  {
    name: "username",
    align: "left",
    label: "username",
    field: "username",
    sortable: true,
  },
  {
    name: "role_id",
    align: "left",
    label: "role_id",
    field: "role_id",
    sortable: true,
  },
  {
    name: "role_name",
    align: "left",
    label: "role_name",
    field: "role_name",
    sortable: true,
  },
  {
    name: "action",
    align: "left",
    label: "action",
    field: "action",
    sortable: true,
  },
];

// initialitation categories
let users = ref([]);

const fetch = () => {
  api.get("users").then((res) => {
    users.value = res.data.data[0];
  });
};

fetch()

const destroy = (props) => {
  api
    .post("users/delete", {
      id_user: props.id_user,
    })
    .then((res) => {
      fetch();
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
