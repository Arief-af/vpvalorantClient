<template>
  <q-page padding class="dashboard__content">
    <div class="q-pa-md-xl">

      <q-table
        class="q-mt-xl"
        flat
        bordered
        title="Data Virtual Account"
        :rows="virtual_account"
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

      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "boot/axios";
import { ref } from "vue";

let data = ref({});
let errors = ref({});

const columns = [
  {
    name: "id_virtual_account",
    align: "center",
    label: "id_virtual_account",
    field: "id_virtual_account",
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
    name: "number",
    align: "left",
    label: "number",
    field: "number",
    sortable: true,
  },
];

// initialitation categories
let virtual_account = ref([]);

api.get("virtual_account").then((res) => {
  virtual_account.value = res.data.data[0];
});

const fetch = () => {
  api
    .get("checkout/edit", { params: { id_checkout: params_checkout } })
    .then((res) => {
      dataCheckout.value = res.data.data[0][0][0];
    });
};

</script>

<style lang="scss" scoped>
.dashboard__content {
  background: rgb(228, 228, 228);
}
</style>
