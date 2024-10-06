import jwt, { JsonWebTokenError } from "jsonwebtoken";
import * as jose from "jose";

export type Payload = {
  id: string | null;
  data1: string | null;
  data2: string | null;
};

export class ClassPayload {
  id: string | null;
  data1: string | null;
  data2: string | null;

  constructor(id: string | null, data1: string | null, data2: string | null) {
    this.id = id;
    this.data1 = data1;
    this.data2 = data2;
  }
}

interface P {
  id: string;
  data1: string;
  data2: string;
}

interface JoseError {
  code: string;
  name: string;
  claim: string;
  reason: string;
}

if (!process.env.JWT_SECRET) {
  throw new Error('Invalid/Missing environment variable: "JWT_SECRET"');
}

const JWT_SECRET = process.env?.JWT_SECRET;

export const SignJWT = async (payload: Payload, expires: string) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expires,
  });
  return token;
};

export const VerifyJWT = (token: string): Payload => {
  return jwt.verify(token.trim(), JWT_SECRET) as Payload;
};

export const SignJOSE = async (payload: Payload, expires: string) => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const alg = "HS256";

  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime(expires)
    .sign(secret);
  return token;
};

export const VerifyJOSE = async (token: string) => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const verifyResult = jose
    .jwtVerify(token.trim(), secret)
    .then((value) => {
      return value;
    })
    .catch((error) => {
      const joseError = error as JoseError;
      return `Error Occurred: ${joseError.code}, ${joseError.reason}`;
    });

  return verifyResult;
};
