

import { Roles } from '@/application/modules/account/entities/account';

import { makeCreateQuestionController } from '@/application/modules/question/use-cases/create-question/factories/make-create-question-controller';
import { makeDeleteQuestionController } from '@/application/modules/question/use-cases/delete-question/factories/make-delete-question-controller';
import { makeGetQuestionController } from '@/application/modules/question/use-cases/get-question/factories/make-get-question-controller';
import { makeGetQuestionsController } from '@/application/modules/question/use-cases/get-questions/factories/make-get-questions-controller';
import { makeUpdateQuestionController } from '@/application/modules/question/use-cases/update-question/factories/make-update-question-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { makeFileUploadMiddleware } from '@/application/shared/http/middlewares/factories/make-file-upload-middleware';
import { MulterFileType } from '@/application/shared/http/middlewares/file-upload/shared';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const questionsRouter = Router();


const fileUploadMiddleware = makeFileUploadMiddleware<'video'>({
  fieldName: 'video',
  multerFileType: MulterFileType.SingleFile,
  limitsByMimeTypes: [
    {
      mimeTypes: ['video/mp4', 'video/mov', 'video/quicktime'],
    },
  ],
  fileName: (file) => file.originalname,
});

questionsRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  fileUploadMiddleware,
  routeAdapter(makeCreateQuestionController())
);
questionsRouter.get('/:questionId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetQuestionController())
);
questionsRouter.get('/lesson/:lessonId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeGetQuestionsController())
);
questionsRouter.put('/:questionId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  fileUploadMiddleware,
  routeAdapter(makeUpdateQuestionController())
);
questionsRouter.delete('/:questionId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteQuestionController())
);

