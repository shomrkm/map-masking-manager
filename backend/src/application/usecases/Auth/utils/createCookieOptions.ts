import { CookieOptions } from 'express';

/**
 * Create Cookie Options
 */
export const createCookieOptions = (): CookieOptions => {
  const jwtExpire = parseInt(process.env.JWT_COOKIE_EXPIRE || '30');
  const options = {
    expires: new Date(Date.now() + jwtExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && true,
  };

  return options;
};
