import { setupHttpClient } from '@midwayjs/rpc';
import type { Middleware, HttpContext } from '@midwayjs/rpc';
import { useLayoutEffect, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from './auth';

export function ApiMiddleware() {
  const { token, signout } = useAuth();
  const tokenRef = useRef(token);
  useLayoutEffect(() => {
    tokenRef.current = token;
  });
  const setRef = useRef(false);
  if (!setRef.current) {
    setRef.current = true;
    const middleware: Middleware<HttpContext> = async (ctx, next) => {
      try {
        const currentToken = tokenRef.current;
        if (currentToken && currentToken.accessToken) {
          ctx.req.headers = {
            ...ctx.req.headers,
            authorization: `${currentToken.tokenType} ${currentToken.accessToken}`,
          };
        }
        await next();
      } catch (err: any) {
        console.log(err);
        const msg = err.data?.message || err.message;
        if (err.status === 401) {
          signout();
        }
        enqueueSnackbar(msg, { variant: 'error' });
        throw err;
      }
    };
    setupHttpClient({ middleware: [middleware] });
  }

  return null;
}
