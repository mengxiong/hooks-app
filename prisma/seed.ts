import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  phone: '15623530290',
  password: bcrypt.hashSync('123456', 10),
  role: 'ADMIN',
};

async function main() {
  console.log(`Start seeding ...`);
  const user = await prisma.user.create({ data: userData });
  console.log(`Created user with id: ${user.id}`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
