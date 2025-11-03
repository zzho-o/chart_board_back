import jwt from 'jsonwebtoken';

const SECRET = 'fe_hiring_secret_key';

export function signJwt(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
