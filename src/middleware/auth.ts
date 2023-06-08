import { Request, Response,} from "express";
import token from "jsonwebtoken";
export function authMiddleware(req: Request, res: Response, next: any) {
  const tokenheader = req.headers["authorization"] as string;
  if (!tokenheader) {
    console.log(req.headers);
    return res.status(401).json({
      error: "No token provided",
    });
  }
  try {
    token.verify(tokenheader.split(" ")[1], process.env.SECRET!);
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid token",
    });
  }
}