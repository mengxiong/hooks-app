import { useMemo } from 'react';
import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { AuthContext } from './AuthContext';

const authLocalKey = 'auth_token';

export function AuthRouterProvider({ routes }: { routes: RouteObject[] }) {
  const [token, signin, signout] = useLocalStorage(authLocalKey);

  const value = useMemo(
    () => ({
      token,
      signin,
      signout,
    }),
    [token, signin, signout]
  );

  return (
    <AuthContext.Provider value={value}>
      <RouterProvider router={createHashRouter(routes)} />
    </AuthContext.Provider>
  );
}
