
import { makeCreatePaymentDetailsOnboardingUrlController } from '@/application/modules/account/use-cases/create-payment-details-onboarding-url/factories/make-create-payment-details-onboarding-url-controller';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { makeAuthenticationMiddleware } from '../../../application/shared/http/middlewares/factories/make-authentication-middleware';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';
import { accountsRouter } from './account-router';
import { answersRouter } from './answer-router';
import { authRouter } from './auth-router';
import { chaptersRouter } from './chapter-router';
import { contentsRouter } from './content-router';
import { coursesRouter } from './course-mapper';
import { journeyRouter } from './journey-router';
import { lessonsRouter } from './lesson-router';
import { machineLearningModelRouter } from './machine-learning-model-router';
import { modulesRouter } from './modules-router';
import { questionsRouter } from './question-router';
import { unitsRouter } from './unit-router';


export const appRouter = Router();

const authMiddleware = middlewareAdapter(makeAuthenticationMiddleware());

appRouter.use('/auth', authRouter);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 20,
  message: 'Too many requests, please try again later.'
});

appRouter.get('/payments-details/onboarding',
  limiter,
  routeAdapter(makeCreatePaymentDetailsOnboardingUrlController(), {
    bodyParamUrl: 'onboardingUrl',
    shallRedirect: true
  })
);

appRouter.use('/accounts', authMiddleware, accountsRouter);
appRouter.use('/units', authMiddleware, unitsRouter);
appRouter.use('/chapters', authMiddleware, chaptersRouter);
appRouter.use('/lessons', authMiddleware, lessonsRouter);
appRouter.use('/modules', authMiddleware, modulesRouter);
appRouter.use('/contents', authMiddleware, contentsRouter);
appRouter.use('/questions', authMiddleware, questionsRouter);
appRouter.use('/answers', authMiddleware, answersRouter);
appRouter.use('/machine-learning-models', authMiddleware, machineLearningModelRouter);
appRouter.use('/journeys', authMiddleware, journeyRouter);
appRouter.use('/courses', authMiddleware, coursesRouter);
