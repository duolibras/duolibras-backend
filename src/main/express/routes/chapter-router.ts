

import { Roles } from '@/application/modules/account/entities/account';

import { makeCreateChapterController } from '@/application/modules/chapter/use-cases/create-chapter/factories/make-create-chapter-controller';
import { makeDeleteChapterController } from '@/application/modules/chapter/use-cases/delete-chapter/factories/make-delete-chapter-controller';
import { makeGetChaptersController } from '@/application/modules/chapter/use-cases/get-chapters/factories/make-get-chapters-controller';
import { makeUpdateChapterController } from '@/application/modules/chapter/use-cases/update-chapter/factories/make-update-chapter-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const chaptersRouter = Router();

chaptersRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeCreateChapterController())
);
chaptersRouter.get('/unit/:unitId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetChaptersController())
);
chaptersRouter.put('/:chapterId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeUpdateChapterController())
);
chaptersRouter.delete('/:chapterId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteChapterController())
);

