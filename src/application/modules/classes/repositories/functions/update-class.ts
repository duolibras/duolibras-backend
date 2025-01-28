import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Class } from '../../entities/class';
import { ClassMapper } from '../../mappers/class-mapper';

export async function prismaUpdateClass(data: Class) {
  await prismaClient.class.update({
    where: { id: data.id },
    data: ClassMapper.toPersistence(data)
  });
}
