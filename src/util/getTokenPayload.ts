import { Request } from "express";
import token from "jsonwebtoken";

export function getTokenPayload(req: Request) {
  const tokenheader = req.headers["authorization"];
  if (!tokenheader) {
    return undefined
  }
  return token.verify(tokenheader.split(" ")[1], process.env.SECRET!);
}