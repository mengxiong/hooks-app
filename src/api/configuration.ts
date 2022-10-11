import { createConfiguration, hooks } from '@midwayjs/hooks';
import * as Koa from '@midwayjs/koa';
import { defaultConfig } from './config/default';

/**
 * setup midway server
 */
export default createConfiguration({
  imports: [Koa, hooks()],
  importConfigs: [
    {
      default: defaultConfig,
    },
  ],
});
