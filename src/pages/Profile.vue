<template>
  <div>
    <div class="auth__wrapper">
      <div class="auth__title q-ml-md">My Profile</div>
      <div class="auth__body">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="user.name"
            filled
            rounded
            type="text"
            readonly
            placeholder="name"
          />
          <q-input
            v-model="user.email"
            filled
            readonly
            rounded
            type="email"
            placeholder="email"
          />
          <q-input
            v-model="user.username"
            filled
            rounded
            readonly
            type="text"
            placeholder="username"
          />

          <div class="q-pa-lg">Update Password</div>
          <q-input
            v-model="data"
            filled
            rounded
            type="text"
            placeholder="New Password"
          />
          <div>
            <q-btn
              color="primary"
              class="float-right q-mr-md q-mt-md"
              label="update"
              rounded
              type="submit"
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
import { api } from "boot/axios";
import { useAuth } from "stores/auth";
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
const user = useAuth().user;
let data = ref('')
const $q = useQuasar()
const router = useRouter()

const onSubmit = () => {
  api.post('users/password',{
    password: data.value,
    id_user: user.id_user
  }).then((res)=>{
    data.value = ''
    $q.notify({
      message: res.data.message,
      position: 'top-right',
      color: 'primary'
    })
  })
}

const logout = () => {
  auth.logout().then(()=>{
    router.push({path: '/login'})
  });
}
</script>
