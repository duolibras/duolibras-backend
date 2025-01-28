import { Roles } from '@/application/modules/account/entities/account';
import { makeArchiveClassController } from '@/application/modules/classes/use-cases/archive-class/factories/make-archive-class-controller';
import { makeCreateClassController } from '@/application/modules/classes/use-cases/create-class/factories/make-create-class-controller';
import { makeDeleteClassController } from '@/application/modules/classes/use-cases/delete-class/factories/make-delete-class-controller';
import { makeGetClassVideoController } from '@/application/modules/classes/use-cases/get-class-video/factories/make-get-class-video-controller';
import { makeGetClassesController } from '@/application/modules/classes/use-cases/get-classes/factories/make-get-classes-controller';
import { makeUnarchiveClassController } from '@/application/modules/classes/use-cases/unarchive-class/factories/make-unarchive-class-controller';
import { makeUpdateClassController } from '@/application/modules/classes/use-cases/update-class/factories/make-update-class-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const classesRouter = Router();

classesRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.TEACHER])),
  routeAdapter(makeCreateClassController())
);

classesRouter.get('/course/:courseId',
  routeAdapter(makeGetClassesController())
);

classesRouter.get('/:classId/video',
  routeAdapter(makeGetClassVideoController())
);

classesRouter.delete('/:classId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.TEACHER])),
  routeAdapter(makeDeleteClassController())
);

classesRouter.put('/:classId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.TEACHER])),
  routeAdapter(makeUpdateClassController())
);

classesRouter.patch('/:classId/archive',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.TEACHER])),
  routeAdapter(makeArchiveClassController())
);

classesRouter.patch('/:classId/unarchive',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.TEACHER])),
  routeAdapter(makeUnarchiveClassController())
);
