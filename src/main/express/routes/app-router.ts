
import { Router } from 'express';
import { makeAuthenticationMiddleware } from '../../../application/shared/http/middlewares/factories/make-authentication-middleware';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { authRouter } from './auth-router';
import { chaptersRouter } from './chapter-router';
import { lessonsRouter } from './lesson-router';
import { modulesRouter } from './modules-router';
import { unitsRouter } from './unit-router';

export const appRouter = Router();

const authMiddleware = middlewareAdapter(makeAuthenticationMiddleware());

appRouter.use('/auth', authRouter);
appRouter.use('/units', authMiddleware, unitsRouter);
appRouter.use('/chapters', authMiddleware, chaptersRouter);
appRouter.use('/lessons', authMiddleware, lessonsRouter);
appRouter.use('/modules', authMiddleware, modulesRouter);
