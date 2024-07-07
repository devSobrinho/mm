"use client";
import { useUserContext } from "@/contexts/UserContext";
import { FormEventHandler, useContext } from "react";

export const FormLogin = (): JSX.Element => {
  const { login } = useUserContext();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const email = e.currentTarget["email" as never]["value" as never];
    const password = e.currentTarget["password" as never]["value" as never];
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input id="email" name={"email"} />
      <label htmlFor="password">Password</label>
      <input id={"password"} name="password" />
      <button type="submit">LOGAR</button>
    </form>
  );
};
