

import { Roles } from '@/application/modules/account/entities/account';
import { makeAnswerQuestionJourneyController } from '@/application/modules/journey/use-cases/answer-question-journey/factories/make-answer-question-journey-controller';
import { makeCompleteLessonJourneyController } from '@/application/modules/journey/use-cases/complete-lesson-journey/factories/make-complete-lesson-journey-controller';
import { makeGetMyJourneyController } from '@/application/modules/journey/use-cases/get-my-journey/factories/make-get-my-journey-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const journeyRouter = Router();

journeyRouter.get('/me',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.STUDENT])),
  routeAdapter(makeGetMyJourneyController())
);

journeyRouter.put('/lessons/:lessonId/complete',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.STUDENT])),
  routeAdapter(makeCompleteLessonJourneyController())
);

journeyRouter.get('/questions/:questionId/answers/:answerId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.STUDENT])),
  routeAdapter(makeAnswerQuestionJourneyController())
);

