import { Api, Post, useConfig, Validate } from '@midwayjs/hooks';
import { httpError } from '@midwayjs/core';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { omit } from 'lodash';
import { prisma } from './prisma';

function getToken(user: User, { secret, expiresIn }: { secret: string; expiresIn: string }) {
  const payload = { id: user.id };
  return jwt.sign(payload, secret, { expiresIn });
}

function useTokens(user: User) {
  const tokenConfig = useConfig('jwt.token');
  const refreshTokenConfig = useConfig('jwt.refreshToken');
  return {
    accessToken: getToken(user, tokenConfig),
    refreshToken: getToken(user, refreshTokenConfig),
    user: omit(user, 'password'),
  };
}

const SignUpSchema = z.object({
  phone: z.string().min(1),
  password: z.string().min(6),
});

// 注册
export const signUp = Api(
  Post('/auth/signup'),
  Validate(SignUpSchema),
  async ({ phone, password }: z.infer<typeof SignUpSchema>) => {
    const existUser = await prisma.user.findUnique({ where: { phone } });
    if (existUser) {
      throw new httpError.BadRequestError('手机号已注册');
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: { phone, password: encryptedPassword },
    });
    return useTokens(user);
  }
);

const LoginSchema = z.object({
  phone: z.string().min(1),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof LoginSchema>;

// 登录
export const login = Api(
  Post('/auth/login'),
  Validate(LoginSchema),
  async ({ phone, password }: LoginDto) => {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new httpError.BadRequestError('手机号不存在');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new httpError.BadRequestError('密码错误');
    }
    return useTokens(user);
  }
);
