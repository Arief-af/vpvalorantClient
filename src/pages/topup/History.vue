<template>
  <div>
    <q-table title="History" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script>
const columns = [
  {
    field: 'timestamp',
    required: true,
    label: "timestamp",
    align: "left",
    sortable: true,
  },
  {
    field: "RiotID",
    required: true,
    label: "timestamp",
    align: "left",
    sortable: true,
  },
  {
    field: "PaymentMethods",
    required: true,
    label: "timestamp",
    align: "left",
    sortable: true,
  },
  {
    field: "TotalPrice",
    required: true,
    label: "timestamp",
    align: "left",
    sortable: true,
  },
];

const rows = [
  {
    timestamp: "2022/01/01 13 AM",
    RiotID: 159,
    PaymentMethods: 6.0,
    TotalPrice: 24,
  },
    {
    timestamp: "2022/01/01 13 AM",
    RiotID: 159,
    PaymentMethods: 6.0,
    TotalPrice: 24,
  },
    {
    timestamp: "2022/01/01 13 AM",
    RiotID: 159,
    PaymentMethods: 6.0,
    TotalPrice: 24,
  },
    {
    timestamp: "2022/01/01 13 AM",
    RiotID: 159,
    PaymentMethods: 6.0,
    TotalPrice: 24,
  },
    {
    timestamp: "2022/01/01 13 AM",
    RiotID: 159,
    PaymentMethods: 6.0,
    TotalPrice: 24,
  },
];

export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
<style>
.auth__title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 0.01em;
  margin-bottom: 30px;
  color: #000000;
}
</style>
