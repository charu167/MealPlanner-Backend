import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: any = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const JWT_PASSWORD = process.env.JWT_PASSWORD || "";

  if (!JWT_PASSWORD) {
    console.log("No JWT password");
    return;
  }

  const user = jwt.verify(token, JWT_PASSWORD, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = user;

    next();
  });
}
