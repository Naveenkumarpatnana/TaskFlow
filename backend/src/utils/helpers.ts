import jwt from 'jsonwebtoken';

export const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id, role }, secret, { expiresIn } as jwt.SignOptions);
};

export const formatError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const validateEmail = (email: string): boolean => {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim();
};
