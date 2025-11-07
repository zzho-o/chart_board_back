import * as jwt from 'jsonwebtoken';

const SECRET = 'your_secret_key';

export interface JwtPayload {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyJwt(token: string): JwtPayload {
  const decoded = jwt.verify(token, SECRET);

  if (typeof decoded === 'string') {
    throw new Error('Invalid token payload');
  }

  return decoded as JwtPayload;
}
