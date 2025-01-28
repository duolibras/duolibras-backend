import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { ClassMapper } from '../../mappers/class-mapper';

export async function prismaGetClass(classId: string, accountId: string) {
  const classCourse = await prismaClient.class.findUnique({
    where: {
      id: classId,
      OR: [
        {
          archived: false
        },
        {
          archived: true,
          teacherId: accountId,
        }
      ],
    },
  });

  return classCourse ? ClassMapper.toDomain(classCourse) : null;
}
