import { Request, Response,} from "express";
import token from "jsonwebtoken";
export function authMiddleware(req: Request, res: Response, next: any) {
  const tokenheader = req.headers["x-access-token"] as string;
  if (!tokenheader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  try {
    token.verify(tokenheader, process.env.SECRET!);
    next();
  } catch (error) {
    res.status(401).json({
      auth: false,
      message: "Invalid token",
    });
  }
}