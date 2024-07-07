"use client";

import { useUserContext } from "@/contexts/UserContext";
import { useCanSee } from "@/hooks/useCanSee";
import { PATH } from "@/utils/paths";
import { ROLE } from "@/utils/role";
import Link from "next/link";

export const Menu = (): JSX.Element => {
  const { user, logout } = useUserContext();

  const isAdmin = useCanSee(ROLE.admin);
  const isUser = useCanSee(ROLE.user);

  if (!user) return <></>;

  return (
    <>
      nosso menu
      <nav>
        <ul>
          {isUser && (
            <>
              <li>
                <Link href={PATH.user.profile}>PROFILE</Link>
              </li>
              <li>
                <Link href={PATH.user.changePassword}>changePassword</Link>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li>
                <Link href={PATH.funcionarios}>funcionarios</Link>
              </li>
              <li>
                <Link href={PATH.relatorios}>relatorios</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {JSON.stringify(user)}
      <button onClick={logout} className="bg-green-500 p-5">
        DESLOGAR
      </button>
    </>
  );
};
