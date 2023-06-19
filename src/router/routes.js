import guestMiddleware from "src/middleware/guestMiddleware";
import userMiddleware from "src/middleware/userMiddleware";
import adminMiddleware from "src/middleware/adminMiddleware";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        meta: {
          middleware: [userMiddleware],
        },
        path: "/topup",
        name: "topup",
        component: () => import("pages/topup/Index.vue"),
      },
      {
        meta: {
          middleware: [userMiddleware],
        },
        name: "checkout",
        path: "/topup/:id/checkout",
        component: () => import("pages/topup/Checkout.vue"),
      },
    ],
  },
  {
    name: "accessDenied",
    path: "/accessDenied",
    component: () => import("pages/AccessDenied.vue"),
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        meta: {
          middleware: [guestMiddleware],
        },
        path: "/register",
        component: () => import("pages/auth/Register.vue"),
      },
      {
        meta: {
          middleware: [guestMiddleware],
        },
        name: "login",
        path: "/login",
        component: () => import("pages/auth/Login.vue"),
      },
    ],
  },
  {
    path: "/profile",
    component: () => import("layouts/ProfileLayout.vue"),
    children: [
      {
        meta: {
          middleware: [userMiddleware],
        },
        path: "/profile",
        name: 'profile',
        component: () => import("pages/Profile.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/Dashboard.vue"),
    meta: {
      middleware: [adminMiddleware],
    },
    children: [
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/transaction",
        component: () => import("pages/dashboard/transaction/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard",
        name: "dashboard",
        component: () => import("pages/dashboard/transaction/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/users",
        component: () => import("pages/dashboard/user/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/users/create",
        component: () => import("pages/dashboard/user/Create.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/roles",
        component: () => import("pages/dashboard/roles/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/roles/create",
        component: () => import("pages/dashboard/roles/Create.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/banks",
        component: () => import("pages/dashboard/bank/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/banks/create",
        component: () => import("pages/dashboard/bank/Create.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/virtual_account",
        component: () => import("pages/dashboard/virtual_account/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
        },
        path: "/dashboard/vouchers",
        component: () => import("pages/dashboard/voucher/Index.vue"),
      },
      {
        meta: {
          middleware: [adminMiddleware],
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
