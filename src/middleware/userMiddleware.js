export default function userMiddleware({ next, store }) {
  let isLoggedIn = store.isLoggedIn;
  let checkRole = () => {
    if (store.user) {
      return store.user.role_name
    }
    return undefined
  };
  const role = checkRole()
  const isUser = (role) => {
    if (role === "user") {
      return true;
    }
  };
  if (!isLoggedIn) {
    return next({
      name: "login",
    });
  } else if (!isUser(role)) {
    return next({
      name: "accessDenied",
    });
  }
  return next();
}
