export default function adminMiddleware({ next, store }) {
  let isLoggedIn = store.isLoggedIn;
  let checkRole = () => {
    if (store.user) {
      return store.user.role_name
    }
    return undefined
  };
  const role = checkRole()
  const isAdmin = (role) => {
    if (role === "admin") {
      return true;
    }
  };
  if (!isLoggedIn) {
    return next({
      name: "login",
    });
  } else if (!isAdmin(role)) {
    return next({
      name: "accessDenied",
    });
  }
  return next()
}
