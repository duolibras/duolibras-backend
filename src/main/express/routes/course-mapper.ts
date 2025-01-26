import { Roles } from '@/application/modules/account/entities/account';
import { makeCreateCourseController } from '@/application/modules/course/use-cases/create-course/factories/make-create-course-controller';
import { makeJoinCourseController } from '@/application/modules/course/use-cases/join-course/factories/make-join-course-controller';
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
