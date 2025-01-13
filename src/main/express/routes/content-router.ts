

import { Roles } from '@/application/modules/auth/entities/account';

import { makeCreateContentController } from '@/application/modules/content/use-cases/create-content/factories/make-create-content-controller';
import { makeDeleteContentController } from '@/application/modules/content/use-cases/delete-content/factories/make-delete-content-controller';
import { makeGetContentController } from '@/application/modules/content/use-cases/get-content/factories/make-get-content-controller';
import { makeGetContentsController } from '@/application/modules/content/use-cases/get-contents/factories/make-get-contents-controller';
import { makeUpdateContentController } from '@/application/modules/content/use-cases/update-content/factories/make-update-content-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const contentsRouter = Router();

contentsRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeCreateContentController())
);
contentsRouter.get('/:contentId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetContentController())
);
contentsRouter.get('/lesson/:lessonId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetContentsController())
);
contentsRouter.put('/:contentId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeUpdateContentController())
);
contentsRouter.delete('/:contentId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteContentController())
);

