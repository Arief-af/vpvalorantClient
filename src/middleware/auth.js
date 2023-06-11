import { useAuth } from "stores/auth";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const auth = useAuth() || null;

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (auth.user.role_name === 'admin') {
        // Jika auth.user.role_name adalah 'admin', izinkan akses
        next();
      } else {
        // Jika bukan admin, redirect ke halaman topup
        next('/topup');
      }
    } else if (to.matched.some(record => record.meta.requiresUser)) {
      if (auth.user.role_name === 'user' || auth.user.role_name === 'admin') {
        // Jika role_id adalah 'user' atau 'admin', izinkan akses
        next();
      } else {
        // Jika bukan admin atau user, redirect ke halaman login
        next('/login');
      }
    } else if (to.path === '/login' || to.path === '/register') {
      if (auth.user.role_name === 'admin') {
        // Jika rolenya adalah 'admin', redirect ke halaman lain (misalnya dashboard)
        next('/dashboard');
      } else if (auth.user.role_name === 'user') {
        // Jika rolenya adalah 'user', redirect ke halaman topup
        next('/topup');
      } else {
        // Jika bukan admin atau user, izinkan akses ke halaman login dan register
        next();
      }
    } else {
      // Jika halaman tidak memerlukan autentikasi, izinkan akses
      next();
    }
  });
};
