"use client";

import {
  IReqAuthLoginData,
  IReqAuthRegisterData,
  IResponseAuthLogin,
} from "@/interfaces/requests/auth.interface";
import { authRequest } from "@/services/requests/auth";
import { KEYS_LOCAL_STORAGE } from "@/utils/localstorage";
import { PATH } from "@/utils/paths";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = Omit<IResponseAuthLogin, "token">;

interface IUserContext {
  user?: User;
  login: (data: IReqAuthLoginData) => Promise<void>;
  register: (data: IReqAuthRegisterData) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  const login = async (data: IReqAuthLoginData) => {
    try {
      const response = await authRequest.login(data);
      const newUser = response.data;
      setUser(newUser);
      localStorage.setItem(KEYS_LOCAL_STORAGE.USER, JSON.stringify(newUser));
      router.push(PATH.index);
    } catch (error) {
      alert("DADAOS INVALIDOS");
    }
  };

  const register = async (data: IReqAuthRegisterData) => {
    try {
      const response = await authRequest.register(data);
      alert(response.data || "usuario cadastrado com sucesso");
    } catch (error) {
      alert("DADAOS INVALIDOS");
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem(KEYS_LOCAL_STORAGE.USER);
    router.push(PATH.login);
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem(KEYS_LOCAL_STORAGE.USER);
    const newUser: IResponseAuthLogin = JSON.parse(userLocalStorage || "{}");
    if (newUser.id) setUser(newUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
