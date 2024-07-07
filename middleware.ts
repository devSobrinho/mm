import { adminRoutes, PATH, publicRoutes, userRoutes } from "@/utils/paths";
import { ROLE } from "@/utils/role";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface IUserInfo {
  id: number;
  nome: string;
  role: string;
  exp: number;
}

function decodedToken(token: string) {
  return {
    id: 1,
    nome: "jurandir",
    role: "ROLE",
    exp: Date.now() + 3650000,
  };
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const cookie = request.cookies.get(process.env.TOKEN as string);
  const token = cookie?.value;

  if (token) {
    url.pathname = "/not-found";
    const user = decodedToken(token as string) as IUserInfo;
    // Handle the case where the token exists
    // If the token is expired, redirect to the login page
    if (user.exp < Date.now() / 1000) {
      url.pathname = PATH.login;
      return NextResponse.redirect(url);
    }

    if (publicRoutes.includes(pathname)) {
      url.pathname = PATH.index;
      return NextResponse.redirect(url);
    }

    // Check the user's role and restrict access to specific routes
    if (user.role !== ROLE.admin && adminRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }

    if (user.role === ROLE.admin && userRoutes.includes(pathname)) {
      return NextResponse.redirect(url);
    }
  }

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(PATH.login, request.url));
  }
}
