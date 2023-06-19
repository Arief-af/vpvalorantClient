<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dark q-pa-sm dashboard_header text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Dashboard </q-toolbar-title>
        <q-btn color="primary" label="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      class="bg-dark text-white"
      bordered
      side="left"
      behavior="desktop"
    >
      <q-list bordered>
        <q-item>
          <q-item-section top avatar> Dashboard Menu : </q-item-section>
        </q-item>
        <q-expansion-item
          expand-separator
          icon="category"
          label="Roles"
          default-opened
        >
          <q-item
            clickable
            @click="goto('/dashboard/roles/create')"
            v-ripple
            class="q-pl-xl"
          >
            <q-item-section avatar>
              <q-icon color="white" name="create" />
            </q-item-section>
            <q-item-section>New</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="q-pl-xl"
            @click="goto('/dashboard/roles')"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>All Roles</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="person"
          label="Users"
          default-opened
        >
          <q-item
            clickable
            v-ripple
            class="q-pl-xl"
            @click="goto('/dashboard/users/create')"
          >
            <q-item-section avatar>
              <q-icon color="white" name="create" />
            </q-item-section>
            <q-item-section>New</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="q-pl-xl"
            @click="goto('/dashboard/users')"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>All Users</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="category"
          label="vouchers"
          default-opened
        >
          <q-item
            clickable
            @click="goto('/dashboard/vouchers/create')"
            v-ripple
            class="q-pl-xl"
          >
            <q-item-section avatar>
              <q-icon color="white" name="create" />
            </q-item-section>
            <q-item-section>New</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="q-pl-xl"
            @click="goto('/dashboard/vouchers')"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>All Vouchers</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="category"
          label="Banks"
          default-opened
        >
          <q-item
            clickable
            @click="goto('/dashboard/banks/create')"
            v-ripple
            class="q-pl-xl"
          >
            <q-item-section avatar>
              <q-icon color="white" name="create" />
            </q-item-section>
            <q-item-section>New</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="q-pl-xl"
            @click="goto('/dashboard/banks')"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>All Banks</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="category"
          label="Transactions"
          default-opened
        >
          <q-item
            clickable
            v-ripple
            class="q-pl-xl"
            @click="goto('/dashboard/transaction')"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>All Transaction</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useAuth } from 'stores/auth'
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';
export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar()
    const router = useRouter();
    const goto = (name) => {
      router.push({
        path: name,
      });
    };
    const store = useAuth()
    const logout = () => {
      store.logout().then((res) => {
        $q.notify({
          message: res.data.message,
          color: "primary",
          position: "top-right",
        });
        router.push({
          path: "/login",
        });
      });
    };
    return {
      logout,
      leftDrawerOpen,
      goto,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
.dashboard_header {
  border-radius: 0px !important;
}
</style>
