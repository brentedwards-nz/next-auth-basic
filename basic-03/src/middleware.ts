import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authConfig } from "./auth";
import getServerSession from "next-auth";
import { Payload, VerifyJOSE } from "./utils/tokens";

const checkAPIAuthorization = async (authHeader: string) => {
  const jwtToken = authHeader.split("Bearer").at(1) || "";
  if (jwtToken?.length === 0) {
    return "Error no access token";
  }

  try {
    const payload = await VerifyJOSE(jwtToken)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return "Error verifying token";
      });
    return true;
    //return payload;
  } catch (error: any) {
    if ("message" in error) {
      return error.message;
    }
    return "Error checking API authorization token";
  }
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/protected")) {
    const authHeader = req?.headers.get("Authorization");
    if (!authHeader || !checkAPIAuthorization(authHeader)) {
      return NextResponse.json({}, { status: 401 });
    }

    const authResult = await checkAPIAuthorization(authHeader);

    if (authResult !== true) {
      if (typeof authResult == "string") {
        return NextResponse.json({ message: authResult }, { status: 401 });
      }
      return NextResponse.json({}, { status: 401 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*", "/manager"],
};
