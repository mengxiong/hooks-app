/* eslint-disable import/first */
require('dotenv').config();

import { createConfiguration, hooks } from '@midwayjs/hooks';
import * as Koa from '@midwayjs/koa';
import jwt from 'koa-jwt';
import { defaultConfig } from './config/default';

/**
 * setup midway server
 */
export default createConfiguration({
  imports: [
    Koa,
    hooks({
      middleware: [jwt({ secret: process.env.TOKEN_SECRET! }).unless({ path: [/^\/auth/] })],
    }),
  ],
  importConfigs: [
    {
      default: defaultConfig,
    },
  ],
});
