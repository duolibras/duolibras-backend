import { Roles } from '@/application/modules/auth/entities/account';
import { Role } from '@/application/modules/auth/entities/role';
import { makeSignUpUseCase } from '@/application/modules/auth/use-cases/sign-up/factories/make-sign-up-use-case';
import { prismaClient } from '@/application/shared/clients/prisma-clients';

async function seed() {
  const roles = Object.entries(Roles).map(([_key, value]) => new Role({
    code: value
  }));

  await prismaClient.role.createMany({
    data: roles.map((role) => ({
      id: role.id,
      code: role.code,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt
    })),
    skipDuplicates: true
  });

  const createAccountUseCase = makeSignUpUseCase();

  await createAccountUseCase.execute({
    name: 'Duolibras',
    email: 'duolibras@gmail.com',
    password: 'Mudar@123',
    roleCode: Roles.ADMIN,
  });
}

seed();

