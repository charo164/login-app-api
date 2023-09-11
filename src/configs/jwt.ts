import jwt from 'jsonwebtoken';

export const generateToken = (payload: Record<string, any>) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT secret is not defined');

  const token = jwt.sign(payload, secret, { expiresIn: '7d' });

  return token;
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT secret is not defined');

  const payload = jwt.verify(token, secret);

  return payload;
};

export const decodeToken = (token: string) => {
  const payload = jwt.decode(token);

  return payload;
};

export const getTokenFromHeaders = (headers: any) => {
  const token = headers.authorization;

  if (!token) throw new Error('No token provided');

  return token;
};

export const getTokenFromCookies = (cookies: any) => {
  const token = cookies.token;

  if (!token) throw new Error('No token provided');

  return token;
};
