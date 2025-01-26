import { Roles } from '@/application/modules/account/entities/account';
import { makeGetModulesController } from '@/application/modules/module/use-cases/get-modules/factories/make-get-modules-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const modulesRouter = Router();

modulesRouter.get('/lesson/:lessonId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetModulesController()),
);
