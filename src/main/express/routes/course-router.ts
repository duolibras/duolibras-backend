import { Roles } from '@/application/modules/account/entities/account';
import { makeArchiveCourseController } from '@/application/modules/course/use-cases/archive-course/factories/make-archive-course-controller';
import { makeCreateCourseController } from '@/application/modules/course/use-cases/create-course/factories/make-create-course-controller';
import { makeDeleteCourseController } from '@/application/modules/course/use-cases/delete-course/factories/make-delete-course-controller';
import { makeJoinCourseController } from '@/application/modules/course/use-cases/join-course/factories/make-join-course-controller';
import { makeUnarchiveCourseController } from '@/application/modules/course/use-cases/unarchive-course/factories/make-unarchive-course-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const coursesRouter = Router();

coursesRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.TEACHER])),
  routeAdapter(makeCreateCourseController()),
);

coursesRouter.post('/:courseId/join',
  routeAdapter(makeJoinCourseController()),
);

coursesRouter.delete('/:courseId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.TEACHER])),
  routeAdapter(makeDeleteCourseController()),
);

coursesRouter.patch('/:courseId/archive',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.TEACHER])),
  routeAdapter(makeArchiveCourseController()),
);

coursesRouter.patch('/:courseId/unarchive',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.TEACHER])),
  routeAdapter(makeUnarchiveCourseController()),
);
