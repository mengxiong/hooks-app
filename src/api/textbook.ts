import { Api, Get, Params, Post } from '@midwayjs/hooks';
import { Prisma } from '@prisma/client';
import { useParam } from './hooks';
import { prisma } from './prisma';

export const createTextbook = Api(Post('/textbook'), async (data: Prisma.TextbookCreateInput) => {
  return prisma.textbook.create({ data });
});

export const getTextbooks = Api(Get('/textbook'), async () => {
  const data = await prisma.textbook.findMany({});
  const count = await prisma.textbook.count();
  return { data, count };
});

export const getTextbook = Api(Get('/textbook/:id'), Params<{ id: string }>(), async () => {
  const id = useParam('id');
  return prisma.textbook.findUnique({ where: { id: +id }, include: { units: true } });
});
