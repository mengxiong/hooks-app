import * as dotenv from 'dotenv';

dotenv.config();

export const defaultConfig = {
  keys: 'session_keys',
  jwt: {
    token: {
      secret: process.env.TOKEN_SECRET,
      expiresIn: '1d',
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    },
  },
};
