const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        meta: {
          requiresUser: true, // Admin dan user bisa mengakses halaman ini
        },
        path: "/topup",
        component: () => import("pages/topup/Index.vue"),
      },
      {
        meta: {
          requiresUser: true, // Admin dan user bisa mengakses halaman ini
        },
        name: "checkout",
        path: "/topup/:id/checkout",
        component: () => import("pages/topup/Checkout.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/register", component: () => import("pages/auth/Register.vue") },
      { path: "/login", component: () => import("pages/auth/Login.vue") },
    ],
  },
  {
    path: "/profile",
    component: () => import("layouts/ProfileLayout.vue"),
    children: [
      {
        meta: {
          requiresUser: true, // Admin dan user bisa mengakses halaman ini
        },
        path: "/profile",
        component: () => import("pages/Profile.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/transaction",
        component: () => import("pages/dashboard/transaction/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/",
        component: () => import("pages/dashboard/transaction/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/users",
        component: () => import("pages/dashboard/user/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/users/create",
        component: () => import("pages/dashboard/user/Create.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/roles",
        component: () => import("pages/dashboard/roles/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/roles/create",
        component: () => import("pages/dashboard/roles/Create.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/banks",
        component: () => import("pages/dashboard/bank/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/banks/create",
        component: () => import("pages/dashboard/bank/Create.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/virtual_account",
        component: () => import("pages/dashboard/virtual_account/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/vouchers",
        component: () => import("pages/dashboard/voucher/Index.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/dashboard/vouchers/create",
        component: () => import("pages/dashboard/voucher/Create.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
