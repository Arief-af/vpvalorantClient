
export default function guestMiddleware({ next, store }) {
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
  const isUser = (role) => {
    if (role === "user") {
      return true;
    }
  };

  if (isAdmin(role)) {
    return next({
      name: "dashboard",
    });
  }

  if (isUser(role)) {
    return next({
      name: "topup",
    });
  }

  return next();
}
