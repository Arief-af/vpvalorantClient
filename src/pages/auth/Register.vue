<template>
  <div>
    <div class="auth__wrapper">
      <div class="auth__title q-ml-md">Register</div>
      <div class="auth__body">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            v-model="user.name"
            filled
            rounded
            type="text"
            placeholder="name"
          />
          <q-input
            v-model="user.username"
            filled
            rounded
            type="text"
            placeholder="username"
          />
          <q-input
            v-model="user.email"
            filled
            rounded
            type="email"
            placeholder="email"
          />
          <q-input
            v-model="user.password"
            filled
            rounded
            type="password"
            placeholder="password"
          />

          <a href="#login" class="q-pa-lg"><u>Already Have Account?</u></a>

          <div>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              class="float-right q-mr-md q-mt-md"
            />
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "stores/auth";
import { reactive, ref } from "vue";
const store = useAuth();
const router = useRouter();
let user = ref({
  name: "",
  username: "",
  email: "",
  password: "",
});

const onSubmit = async () => {
  const userData = reactive({
    name: user.value.name,
    username: user.value.username,
    email: user.value.email,
    password: user.value.password,
  });
  await store.register(userData);
  router.push({
    path: "/login",
  });
  user.value = {};
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
