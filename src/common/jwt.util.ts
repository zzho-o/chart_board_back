import * as jwt from 'jsonwebtoken';

export type JwtPayload = { id: string; email: string };

const SECRET = 'dummy-secret';

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}
