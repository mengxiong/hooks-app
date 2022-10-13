import { useContext } from '@midwayjs/hooks';
import type { Context } from '@midwayjs/koa';

export function useParam(key: string): string {
  const ctx = useContext<Context>();

  return ctx.params[key];
}
