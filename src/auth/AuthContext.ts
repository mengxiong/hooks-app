import React from 'react';

interface AuthContextType<T = any> {
  token: T;
  signin: (token: T) => void;
  signout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth<T = any>(): AuthContextType<T> {
  return React.useContext(AuthContext);
}
