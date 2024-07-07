import { User } from "@/contexts/UserContext";

export interface IReqAuthLoginData {
  email: string;
  password: string;
}

export interface IResponseAuthLogin {
  id: number;
  name: string;
  email: string;
  role: string;
  departamentos: string[];
  token: string;
}

export interface IReqAuthRegisterData {
  email: string;
  password: string;
  name: string;
}
