import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const url = new URL("/entrar", req.nextUrl);
      url.searchParams.set("redirectTo", "/admin");
      return Response.redirect(url);
    }

    const isAdmin = !!req.auth?.user?.isAdmin;
    if (!isAdmin) return Response.redirect(new URL("/", req.nextUrl));
  }

  if (pathname === "/entrar" && isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/entrar"],
};
