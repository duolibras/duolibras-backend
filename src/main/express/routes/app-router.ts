
import { Router } from 'express';
import { makeAuthenticationMiddleware } from '../../../application/shared/http/middlewares/factories/make-authentication-middleware';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { answersRouter } from './answer-router';
import { authRouter } from './auth-router';
import { chaptersRouter } from './chapter-router';
import { contentsRouter } from './content-router';
import { joruneysRouter } from './journey-router';
import { lessonsRouter } from './lesson-router';
import { machineLearningModelRouter } from './machine-learning-model-router';
import { modulesRouter } from './modules-router';
import { questionsRouter } from './question-router';
import { unitsRouter } from './unit-router';

export const appRouter = Router();

const authMiddleware = middlewareAdapter(makeAuthenticationMiddleware());

appRouter.use('/auth', authRouter);
appRouter.use('/units', authMiddleware, unitsRouter);
appRouter.use('/chapters', authMiddleware, chaptersRouter);
appRouter.use('/lessons', authMiddleware, lessonsRouter);
appRouter.use('/modules', authMiddleware, modulesRouter);
appRouter.use('/contents', authMiddleware, contentsRouter);
appRouter.use('/questions', authMiddleware, questionsRouter);
appRouter.use('/answers', authMiddleware, answersRouter);
appRouter.use('/machine-learning-models', authMiddleware, machineLearningModelRouter);
appRouter.use('/journeys', authMiddleware, joruneysRouter);
