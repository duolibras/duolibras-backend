

import { Roles } from '@/application/modules/auth/entities/account';
import { makeGetMyJourneyController } from '@/application/modules/journey/use-cases/get-my-journey/factories/make-get-my-journey-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const joruneysRouter = Router();

joruneysRouter.get('/me',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.STUDENT])),
  routeAdapter(makeGetMyJourneyController())
);

