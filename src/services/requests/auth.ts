import {
  IReqAuthLoginData,
  IReqAuthRegisterData,
  IResponseAuthLogin,
} from "@/interfaces/requests/auth.interface";
import { api } from "../api";
import { ROLE } from "@/utils/role";

export const authRequest = {
  login: (data: IReqAuthLoginData) => {
    const responseData: IResponseAuthLogin = {
      id: 1,
      name: "jurandir",
      email: "jurandir@gmail.comn",
      departamentos: [],
      role: ROLE.user,
      token: "1121",
    };

    return {
      status: 200,
      data: responseData,
    };

    // return api.post<IResponseAuthLogin>("auth/login", data);
  },
  register: (data: IReqAuthRegisterData) => {
    return api.post<string>("auth/register", data);
  },
};
