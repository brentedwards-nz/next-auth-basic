// export { auth as middleware } from "auth";

// export const config = {
//   matcher: [
//     "/protected/:path*",
//     "/((?!api|_next/static|_next/image|.*\\.png$).*)",
//   ],
// };

export { default } from "next-auth/middleware";

export const config = { matcher: ["/protected/:path*"] };
