
import { Router } from 'express';
import { makeAuthenticationMiddleware } from '../../../application/shared/http/middlewares/factories/make-authentication-middleware';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { authRouter } from './auth-router';
import { unitsRouter } from './unit-router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/units',
  middlewareAdapter(makeAuthenticationMiddleware()),
  unitsRouter,
);

