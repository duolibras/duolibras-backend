

import { Roles } from '@/application/modules/account/entities/account';

import { makeCreateAnswerController } from '@/application/modules/answer/use-cases/create-answer/factories/make-create-answer-controller';
import { makeDeleteAnswerController } from '@/application/modules/answer/use-cases/delete-answer/factories/make-delete-answer-controller';
import { makeGetAnswersController } from '@/application/modules/answer/use-cases/get-answers/factories/make-get-answers-controller';
import { makeUpdateAnswerController } from '@/application/modules/answer/use-cases/update-answer/factories/make-update-answer-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const answersRouter = Router();

answersRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeCreateAnswerController())
);
answersRouter.get('/question/:questionId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeGetAnswersController())
);
answersRouter.put('/:answerId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeUpdateAnswerController())
);
answersRouter.delete('/:answerId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteAnswerController())
);

