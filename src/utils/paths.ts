export const PATH = {
  index: "/",
  login: "/login",
  register: "/register",
  funcionarios: "/funcionarios",
  relatorios: "/relatorios",
  user: {
    profile: "/user/profile",
    changePassword: "/user/change-password",
  },
};

export const publicRoutes = [PATH.login, PATH.register];
export const adminRoutes = [PATH.funcionarios, PATH.relatorios];

export const userRoutes = [PATH.user.changePassword, PATH.user.profile];
