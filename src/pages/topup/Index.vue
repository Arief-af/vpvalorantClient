<template>
  <div>
    <div class="hero row justify-between items-center q-pa-30">
      <div class="col-12" style="overflow: hidden">
        <video ref="videoElement" class="hero__video" autoplay="autoplay">
          <source src="video/hero.mp4" type="video/mp4" />
        </video>
        <!-- <q-video ref="videoPlayer" src="video/hero.mp4" class="hero__video"
        :ratio=16/9 /> -->
      </div>
    </div>

    <div class="top-up__wrapper">
      <div class="top-up">
        <div class="top-up__title text-center">top up</div>
        <div class="top-up__riotid q-mt-lg">
          <div class="top-up__riotid_input">
            Riot Id
            <q-input
              filled
              rounded
              required
              v-model="submitData.riotId"
              type="text"
              class="q-mt-sm"
              placeholder="inGameName#TagLine"
            />
          </div>
        </div>

        <div class="top-up__vp q-mt-lg">
          <div class="row justify-center">
            <div
              class="col-12 col-sm-6"
              v-for="(voucher, index) in vouchers"
              :key="index"
              @click="changeVp(voucher.id_voucher)"
            >
              <div class="top-up__vp_wrapper">
                <div class="q-pa-md">Rp. {{ voucher.price }}</div>
                <div
                  :class="{
                    'bg-primary text-white':
                      voucher.id_voucher == submitData.voucher_id,
                  }"
                  class="top-up__vp_content"
                >
                  {{ voucher.amount }} VP
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="top-up__payment-methods q-mt-lg">
          <div
            class="top-up__payment-methods_content row justify-between"
            v-for="(bank, index) in banks"
            :key="index"
            @click="submitData.bank_id = bank.id_bank"
            :class="{
              'bg-primary text-white': bank.id_bank == submitData.bank_id,
            }"
          >
            <div class="col-auto">BANK {{ bank.name }}</div>
            <div class="col-auto">Rp. {{ submitData.total_price }}</div>
          </div>

          <q-btn
            color="primary"
            class="float-right q-mt-lg"
            style="width: 100px"
            rounded
            label="PAY"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
const videoElement = ref(null);
let submitData = ref({
  total_price: 0,
});

let banks = ref([]);
let vouchers = ref([]);
const router = useRouter()

const changeVp = (voucher) => {
  const filteredArray = vouchers.value.filter(
    (obj) => obj.id_voucher === voucher
  );
  submitData.value.voucher_id = voucher;
  submitData.value.total_price = Number(filteredArray[0].price + 1000);
};
const fetch = () => {
  api.get("vouchers").then((res) => {
    vouchers.value = res.data.data[0];
  });

  api.get("banks").then((res) => {
    const ResValue = res.data.data[0];
    const updatedData = ResValue.map((item) => {
      return {
        name: item.name,
        id_bank: item.name,
        fee: 1000,
      };
    });
    banks.value = updatedData;
  });
};

fetch();

const onSubmit = () => {
  let trans_id;
  let virtual_acc_id;
  let total = submitData.value.total_price;
  api
    .post("transactions/create", {
      voucher_id: submitData.value.voucher_id,
      user_id: "5590a8b8-af02-4af3-af77-f6e32d59156a	",
      riotId: submitData.value.riotId,
    })
    .then((res) => {
      trans_id = res.data.data.id_transaction;
      const bankInfo = banks.value.filter(
        (obj) => obj.id_bank === submitData.value.bank_id
      );
      api
        .post("virtual_account/create", {
          name: bankInfo[0].name,
        })
        .then((res) => {
          virtual_acc_id = res.data.data.id_virtual_account;
          api
            .post("checkout/create", {
              virtual_account_id: virtual_acc_id,
              transaction_id: trans_id,
              total_payment: total,
            })
            .then((res) => {
              router.push({
                params: {id: res.data.data.id_checkout},
                name: 'checkout'
              });
            });
        });
    });
};

onMounted(() => {
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

<style lang="scss" scoped></style>
