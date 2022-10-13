export const defaultConfig = {
  keys: 'session_keys',
  jwt: {
    token: {
      secret: process.env.TOKEN_SECRET,
      expiresIn: '4h',
    },
    refreshToken: {
      secret: process.env.TOKEN_SECRET,
      expiresIn: '30d',
    },
  },
};
