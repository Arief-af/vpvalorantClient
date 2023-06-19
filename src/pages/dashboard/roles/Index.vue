<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-form @submit="onUpdate" @reset="onReset" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6">Edit Role</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input dense v-model="data.name" />
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn @click="onCancel" flat label="Cancel" v-close-popup />
              <q-btn label="Submit" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>

      <q-table
        class="q-mt-xl"
        flat
        bordered
        title="Data Role"
        :rows="roles"
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
              color="blue"
              icon="edit"
              @click="onEdit(props.row)"
            ></q-btn>
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
    name: "id_role",
    align: "center",
    label: "id_role",
    field: "id_role",
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
    name: "action",
    align: "left",
    label: "action",
    field: "action",
    sortable: true,
  },
];

let roles = ref([]);

const fetch = () => {
  api.get("roles").then((res) => {
    roles.value = res.data.data[0];
  });
};

fetch();

const destroy = (props) => {
  const id = roles.value.indexOf(props);
  api
    .post("roles/delete", {
      id_role: props.id_role,
    })
    .then((res) => {
      fetch();
      $q.notify({
        message: res.data.message,
        position: 'top-right',
        color: 'primary'
      })
    });
};

let prompt = ref(false);
const onCancel = () => {
  fetch();
};
const onEdit = (props) => {
  data.value = props;
  prompt.value = true;
};

const onUpdate = (props) => {
  api
    .post("roles/update", {
      id_role: data.value.id_role,
      name: data.value.name,
    })
    .then((res) => {
      prompt.value = false
       $q.notify({
        message: res.data.message,
        position: 'top-right',
        color: 'primary'
      })
    });
};
</script>

<style lang="scss" scoped>
.dashboard__content {
  background: rgb(228, 228, 228);
}
</style>
