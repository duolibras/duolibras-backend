

import { Roles } from '@/application/modules/auth/entities/account';

import { makeCreateLessonController } from '@/application/modules/lesson/use-cases/create-lesson/factories/make-create-lesson-controller';
import { makeDeleteLessonController } from '@/application/modules/lesson/use-cases/delete-lesson/factories/make-delete-lesson-controller';
import { makeGetLessonsController } from '@/application/modules/lesson/use-cases/get-lessons/factories/make-get-lessons-controller';
import { makeUpdateLessonController } from '@/application/modules/lesson/use-cases/update-lesson/factories/make-update-lesson-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const lessonsRouter = Router();

lessonsRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeCreateLessonController())
);
lessonsRouter.get('/chapter/:chapterId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetLessonsController())
);
lessonsRouter.put('/:lessonId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeUpdateLessonController())
);
lessonsRouter.delete('/:lessonId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteLessonController())
);

