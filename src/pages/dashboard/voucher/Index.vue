<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-form @submit="onUpdate" @reset="onReset" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6">Edit Voucher</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input label="amount" v-model="data.amount" />
              <q-input label="price" v-model="data.price" />
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
        title="Data Voucher"
        :rows="vouchers"
        :columns="columns"
        row-key="__index"
        :rows-per-page-options="[0]"
        hide-bottom
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

        <template #body-cell-image="props">
          <!-- {{ props.row.image }} -->
          <q-td :props="props">
            <q-img
              :src="`http://localhost:8000/storage/${props.row.image}`"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
            />
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
    name: "id_voucher",
    align: "center",
    label: "id_voucher",
    field: "id_voucher",
    sortable: true,
    classes: "text-dark",
  },

  {
    name: "amount",
    align: "left",
    label: "amount",
    field: "amount",
    sortable: true,
  },
  {
    name: "price",
    align: "left",
    label: "price",
    field: "price",
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
let vouchers = ref([]);

const fetch = () => {
  api.get("vouchers").then((res) => {
    vouchers.value = res.data.data[0];
  });
};

fetch();

const destroy = (props) => {
  api
    .post("vouchers/delete", {
      id_voucher: props.id_voucher,
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
    .post("vouchers/update", {
      id_voucher: data.value.id_voucher,
      amount: data.value.amount,
      price: data.value.price,
    })
    .then((res) => {
      prompt.value = false;
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
