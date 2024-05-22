import { Request, Response } from "express";
import { refreshToken } from "../../utilities/jwt";

export default async function refreshAccessToken(req: Request, res: Response) {
  try {
    const { refresh_token } = req.body;
    const access_token = refreshToken(refresh_token);
    res.status(200).json(access_token);
  } catch (error) {
    console.log(error);
  }
}
