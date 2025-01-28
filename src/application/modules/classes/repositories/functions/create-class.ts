import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Class } from '../../entities/class';
import { ClassMapper } from '../../mappers/class-mapper';

export async function prismaCreateClass(data: Class) {
  await prismaClient.class.create({
    data: ClassMapper.toPersistence(data)
  });
}
