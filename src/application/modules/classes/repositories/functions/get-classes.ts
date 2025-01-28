import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { ClassMapper } from '../../mappers/class-mapper';

export async function prismaGetClasses(courseId: string, accountId: string) {
  const classes = await prismaClient.class.findMany({
    orderBy: { id: 'asc' },
    where: {
      courseId,
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

  return classes.map(ClassMapper.toDomain);
}
