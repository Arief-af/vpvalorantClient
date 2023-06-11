<template>
  <div>
    <div class="checkout__wrapper q-pa-lg">
      <div class="checkout">
        <div class="checkout__info q-mt-lg">
          <div class="checkout__info_riotId row justify-between">
            <div class="col-6">
              RiotId <br />
              <div class="checkout__info_content">
                {{ dataCheckout.riotId }}
              </div>
            </div>
            <div class="col-6">
              Valorant Point <br />
              <div class="checkout__info_content bg-primary text-white">
                {{ dataCheckout.voucher_amount }} VP
              </div>
            </div>
          </div>
        </div>

        <div class="checkout__info q-mt-lg">
          <div class="checkout__info_pay row justify-between row">
            <div class="checkout__info_pay_top bg-primary text-white">
              <div class="checkout__info_pay_top_text">
                VIRTUAL ACCOUNT {{ dataCheckout.bank }}
              </div>
              <div class="checkout__info_pay_top_text">
                Status : {{ dataCheckout.status }}
              </div>
            </div>
            <div class="col-auto">{{ dataCheckout.number }}<br /></div>
            <div class="col-auto">
              Rp. {{ dataCheckout.total_payment }}<br />
            </div>
          </div>
        </div>
        <q-btn
          color="primary"
          class="float-right q-pa-md q-mt-md"
          style="border-radius: 30px; margin-right: 20px"
          label="Check Payment Status"
          @click="checkStatus"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const videoElement = ref(null);
const $q = useQuasar();
let params_checkout;
let dataCheckout = ref({}); // Add a ref for dataCheckout

const fetch = () => {
  api
    .get("checkout/edit", { params: { id_checkout: params_checkout } })
    .then((res) => {
      dataCheckout.value = res.data.data[0][0][0];
    });
};

const checkStatus = () => {
  api
   .get("checkout/edit", { params: { id_checkout: params_checkout } })
    .then((res) => {
      dataCheckout.value = res.data.data[0][0][0];
    }).then(() => {
    $q.notify({
      message: `Your status is ${dataCheckout.value.status}`,
      position: "top-right",
    });
  });
};

onMounted(() => {
  params_checkout = route.params.id;

  fetch();

  if (videoElement.value) {
    videoElement.value.autoplay = true;
    videoElement.value.muted = true;
    videoElement.value.load();

    videoElement.value.addEventListener("ended", () => {
      videoElement.value.currentTime = 0;
      videoElement.value.play();
    });
  }
});
</script>

<style lang="scss" scoped>
.checkout__info_content {
  background: white;
  max-width: 352px;
  margin-top: 10px;
  border-radius: 30px;
  padding: 21.5px 20px 21.5px 20px;
}

.checkout__info {
  background: #f0f0f0;
  border-radius: 43px;
  max-width: 1288px;
  padding-top: 76px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 76px;
}

.checkout__info_pay {
  background: white;
  position: relative;
  margin-top: 10px;
  border-radius: 30px;
  padding: 40.5px 20px 40.5px 20px;
}

.checkout__info_pay_top {
  border-radius: 30px;
  padding: 21.5px 20px 21.5px 20px;
  position: absolute;
  top: -50px;
}
</style>
