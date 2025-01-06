
import { Roles } from '@/application/modules/auth/entities/account';
import { Router } from 'express';
import { makeAuthenticationMiddleware } from '../../../application/shared/http/middlewares/factories/make-authentication-middleware';
import { makeAuthorizationMiddleware } from '../../../application/shared/http/middlewares/factories/make-authorization-middleware';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { authRouter } from './auth-router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);

appRouter.get('/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware([Roles.STUDENT])),
  async (req, res) => res.json({ created: true }),
);

