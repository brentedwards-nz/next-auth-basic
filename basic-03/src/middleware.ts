import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authConfig } from "./auth";
import getServerSession from "next-auth";
import { Payload, VerifyJOSE } from "./utils/tokens";

const checkAPIAuthorization = async (authHeader: string) => {
  console.log("*** checkAPIAuthorization 1");
  const jwtToken = authHeader.split("Bearer").at(1) || "";
  if (jwtToken?.length === 0) {
    return "Error no access token";
  }

  try {
    console.log("*** checkAPIAuthorization 2");
    const payload = await VerifyJOSE(jwtToken)
      .then((value) => {
        console.log("*** checkAPIAuthorization 3");
        return value;
      })
      .catch((error) => {
        console.log("*** checkAPIAuthorization 4");
        return "Error verifying token";
      });

    console.log("*** checkAPIAuthorization 5", payload);
    return true;
    //return payload;
  } catch (error: any) {
    if ("message" in error) {
      console.log("*** checkAPIAuthorization 6");
      return error.message;
    }
    console.log("*** checkAPIAuthorization 7");
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
