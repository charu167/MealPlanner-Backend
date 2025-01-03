import jwt from "jsonwebtoken";

export function generateTokens(
  email: string | undefined,
  firstname: string | undefined,
  id: number
) {
  const JWT_PASSWORD = process.env.JWT_PASSWORD || "";
  const access_token = jwt.sign({ id, email, firstname }, JWT_PASSWORD, {
    expiresIn: "2d",
  });

  const refresh_token = jwt.sign({ id, email, firstname }, JWT_PASSWORD, {
    expiresIn: "15d",
  });

  return { access_token, refresh_token };
}

export function refreshToken(refresh_token: string) {
  interface Decoded {
    email: string;
    firstname: string;
    id: number;
  }
  const JWT_PASSWORD = process.env.JWT_PASSWORD || "";
  const decoded = jwt.verify(refresh_token, JWT_PASSWORD);

  const { email, firstname, id } = decoded as Decoded;
  const access_token = jwt.sign({ id, email, firstname }, JWT_PASSWORD, {
    expiresIn: "3h",
  });
  return access_token;
}
