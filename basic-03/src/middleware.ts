import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  //console.log(`*** middleware:`);
  return NextResponse.next();
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { NextURL } from "next/dist/server/web/next-url";
// import { compare } from "bcrypt-ts";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//   console.log(`*** middleware:`);

//   const encryptedToken = req.cookies.get("authToken")?.value || "";
//   console.log(`*** encryptedToken: ${encryptedToken}`);

//   // const { pathname, origin } = req.nextUrl;

//   // // Decrypt the token
//   // const decryptedToken = CryptoJS.AES.decrypt(
//   //   encryptedToken,
//   //   process.env.NEXT_PUBLIC_CRYPTOJS_KEY || ""
//   // ).toString(CryptoJS.enc.Utf8);

//   // const isTokenValid = decodeToken(decryptedToken);

//   // if (!isTokenValid) {
//   //   // If the token is invalid and user already on the sign-in page,
//   //   // redirect to /sign-in
//   //   if (pathname !== "/sign-in") {
//   //     const loginUrl = new NextURL("/sign-in", origin);
//   //     return NextResponse.redirect(loginUrl);
//   //   }
//   // } else {
//   //   // If token is valid and trying to access sign-in, redirect to dashboard
//   //   if (pathname === "/sign-in") {
//   //     const dashboardUrl = new NextURL("/dashboard", origin);
//   //     return NextResponse.redirect(dashboardUrl);
//   //   }

//   //   // Perform authorization checks
//   //   const isAuthorized = authorizeUser(userInfo, pathname);

//   //   if (!isAuthorized) {
//   //     // Handle unauthorized access (e.g., redirect to access denied page)
//   //     const errorUrl = new NextURL("/access-denied", origin);
//   //     return NextResponse.redirect(errorUrl);
//   //   }
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*", // Protect dashboard route and sub-routes
//     "/sign-in",
//     "/",
//     "/about/:path",
//     // Add more routes to protect
//   ],
// };

// // function to decode token validity
// function decodeToken(token: string): boolean {
//   try {
//     const decodedToken = jwt.decode(token) as jwt.JwtPayload;

//     if (!decodedToken || !decodedToken.exp) {
//       return false;
//     }

//     const currentTime = Math.floor(Date.now() / 1000);
//     return decodedToken.exp > currentTime;
//   } catch (err) {
//     console.error("Token decoding error:", err);
//     return false;
//   }
// }

// function authorizeUser(userInfo: any, requestedPath: string): boolean {
//   // Define roles required for specific paths
//   const roleRequiredForPath: { [key: string]: string[] } = {
//     "/dashboard": ["ADMIN"],
//     // Add more paths and roles as needed
//   };

//   const rolesRequired = roleRequiredForPath[requestedPath];

//   if (rolesRequired) {
//     // Check if user has any of the required roles
//     return rolesRequired.some((role) => userInfo.authorities.includes(role));
//   }

//   // Default to true if no specific roles are required for the path
//   return true;
// }

// function getUserInfoFromToken(token: string) {
//   const tokenData = jwt.decode(token) as { sub: string; authorities: string[] };

//   return {
//     email: tokenData?.sub,
//     authorities: tokenData?.authorities,
//   };
// }

// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";

// // export function middleware(request: NextRequest) {
// //   if (request.nextUrl.pathname.startsWith("/manager")) {
// //     //return NextResponse.rewrite(new URL("/about-2", request.url));
// //   }
// // }
