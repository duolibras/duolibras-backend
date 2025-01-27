import { prismaClient } from '@/application/shared/clients/prisma-clients';
import { Prisma } from '@prisma/client';
import { Course } from '../../entities/course';
import { CourseStudentPaymentStatus } from '../../entities/course-student';
import { CourseMapper } from '../../mappers/course-mapper';
import { IGetCourseQuery } from '../course-repository';

export async function prismaGetCourses(accountId: string, query?: IGetCourseQuery): Promise<Course[]> {
  const teacherCondition: Prisma.CourseWhereInput | undefined = typeof query?.creator === 'boolean'
    ? query.creator
      ? { teacherId: accountId }
      : { teacherId: { not: accountId } }
    : query?.teacherId
      ? { teacherId: accountId }
      : undefined;

  const ownedCondition: Prisma.CourseWhereInput | undefined = typeof query?.owned === 'boolean'
    ? query.owned
      ? {
        students: {
          some: { studentId: accountId, paymentStatus: CourseStudentPaymentStatus.APPROVED },
        },
      }
      : {
        students: {
          none: { studentId: accountId, paymentStatus: CourseStudentPaymentStatus.APPROVED, },
        },
      }
    : undefined;

  const archivedCondition: Prisma.CourseWhereInput | undefined =
    typeof query?.archived === 'boolean'
      ? query.archived
        ? {
          archived: true,
          OR: [
            { teacherId: accountId },
            {
              students: {
                some: {
                  studentId: accountId,
                  paymentStatus: CourseStudentPaymentStatus.APPROVED,
                }
              }
            }
          ]
        }
        : { archived: false }
      : {
        OR: [
          { archived: false },
          {
            archived: true,
            OR: [
              { teacherId: accountId },
              {
                students: {
                  some: {
                    studentId: accountId,
                    paymentStatus: CourseStudentPaymentStatus.APPROVED,
                  },
                },
              }
            ],
          },
        ],
      };

  console.log(archivedCondition);

  const courses = await prismaClient.course.findMany({
    orderBy: { id: 'asc' },
    include: {
      students: {
        take: 1,
        where: { studentId: accountId },
        select: { paymentStatus: true }
      }
    },
    where: {
      ...teacherCondition,
      ...ownedCondition,
      ...archivedCondition,
    }
  });

  return courses.map(CourseMapper.toDomain);
}

