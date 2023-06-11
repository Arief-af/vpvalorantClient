<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-form @submit="onUpdate" @reset="onReset" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6">Edit Status</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-select
                v-model="dataEdit.status"
                :options="options"
                label="Standard"
                filled
              />
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
        title="Data Transaction&Checkout"
        :rows="transaction"
        :columns="columns"
        row-key="__index"
      >
        <!-- action components -->
        <template #body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              flat
              label="status"
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

let data = ref({});
let errors = ref({});
let prompt = ref(false);
let options = ref(["pending", "success", "failed"]);
let dataEdit = ref({})
import { useQuasar } from "quasar";
const $q = useQuasar();
const onEdit = (props) => {
  data.value = props;
  prompt.value = true;
  api
    .get("checkout/edit", { params: { id_checkout: props.id_checkout } })
    .then((res) => {
      dataEdit.value = res.data.data[0][0][0];
    });
};

const destroy = (props) => {
  api
    .post("checkout/delete", {
      id_checkout: props.id_checkout,
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

const onUpdate = () => {
  api
    .post("/checkout/update", {
      id_checkout: dataEdit.value.id_checkout,
      status: dataEdit.value.status,
    })
    .then((res) => {
      prompt.value = false
      data.value = {};
      $q.notify({
        message: res.data.message,
        position: "top-right",
        color: "primary",
      });
    });
};

const columns = [
  {
    name: "action",
    align: "left",
    label: "action",
    field: "action",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "status",
    field: "status",
    sortable: true,
  },
  {
    name: "id_checkout",
    align: "center",
    label: "id_checkout",
    field: "id_checkout",
    sortable: true,
    classes: "text-dark",
  },

  {
    name: "riotId",
    align: "left",
    label: "riotId",
    field: "riotId",
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "name",
    field: "name",
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
    name: "email",
    align: "left",
    label: "email",
    field: "email",
    sortable: true,
  },
  {
    name: "number",
    align: "left",
    label: "Virtual Account",
    field: "number",
    sortable: true,
  },
  {
    name: "voucher_amount",
    align: "left",
    label: "voucher_amount",
    field: "voucher_amount",
    sortable: true,
  },
  {
    name: "total_payment",
    align: "left",
    label: "total_payment",
    field: "total_payment",
    sortable: true,
  },
  {
    name: "timestamp",
    align: "left",
    label: "timestamp",
    field: "timestamp",
    sortable: true,
  },
];

// initialitation categories
let transaction = ref([]);

const fetch = () => {
  api.get("checkout").then((res) => {
    transaction.value = res.data.data[0];
    console.log(transaction.value);
  });
};

fetch()
</script>

<style lang="scss" scoped>
.dashboard__content {
  background: rgb(228, 228, 228);
}
</style>
