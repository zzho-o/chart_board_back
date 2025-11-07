import jwt from 'jsonwebtoken';

const SECRET = 'test_secret'; // 실전에서는 env에서 관리

export function signJwt(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, SECRET);
}
