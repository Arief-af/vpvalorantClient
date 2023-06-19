<template>
  <div>
    <div class="auth__wrapper">
      <div class="auth__title q-ml-md">Login</div>
      <div class="auth__body">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="user.username"
            filled
            rounded
            type="text"
            required
            placeholder="username"
          />
          <q-input
            v-model="user.password"
            filled
            rounded
            type="password"
            required
            placeholder="password"
          />
          <div v-if="error" class="q-px-lg text-negative">{{ error }}</div>
          <router-link to="/register" class="q-pa-lg"
            >Didn't have account?</router-link
          >
          <div>
            <q-btn
              class="float-right"
              style="margin-right: 28px"
              label="Submit"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

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

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "stores/auth";
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
const store = useAuth();
const user = reactive({
  username: "",
  password: "",
});
const $q = useQuasar();
const router = useRouter();
let error = ref("");
const onSubmit = async () => {
  error.value = null;
  await store.login(user).then((res) => {
    if (res.response) {
      error.value = res.response.data.message;
    }
    if (store.token) {
      $q.notify({
        message: "login successful",
        color: "primary",
        position: "top-right",
      });
      if (store.user.role_name == "user") {
        router.push({
          name: "topup",
        });
      }else{
        router.push({
          name: "dashboard",
        });
      }
    }
  });
};
</script>
