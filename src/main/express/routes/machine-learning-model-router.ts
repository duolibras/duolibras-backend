

import { Roles } from '@/application/modules/auth/entities/account';
import { MachineLearningModelFileNames } from '@/application/modules/machine-learning-model/use-cases/create-machine-learning-model/create-machine-learning-model-controller';
import { makeCreateMachineLearningModelController } from '@/application/modules/machine-learning-model/use-cases/create-machine-learning-model/factories/make-create-machine-learning-model-controller';
import { makeDeleteMachineLearningModelController } from '@/application/modules/machine-learning-model/use-cases/delete-machine-learning-model/factories/make-delete-machine-learning-model-controller';
import { makeGetMachineLearningModelsController } from '@/application/modules/machine-learning-model/use-cases/get-machine-learning-models/factories/make-get-machine-learning-models-controller';
import { makeUpdateMachineLearningModelController } from '@/application/modules/machine-learning-model/use-cases/update-machine-learning-model/factories/make-update-machine-learning-model-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { makeFileUploadMiddleware } from '@/application/shared/http/middlewares/factories/make-file-upload-middleware';
import { MulterFileType } from '@/application/shared/http/middlewares/file-upload/shared';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const machineLearningModelRouter = Router();

const fileUploadMiddleware = makeFileUploadMiddleware<MachineLearningModelFileNames>({
  fieldName: 'files',
  multerFileType: MulterFileType.MixedFiles,
  fields: {
    metadata: { maxCount: 1 },
    model: { maxCount: 1 },
    weights: { maxCount: 1 },
  },
  limitsByMimeTypes: [
    {
      mimeTypes: ['application/json'],
      fieldName: 'metadata',
    },
    {
      mimeTypes: ['application/json'],
      fieldName: 'model',
    },
    {
      mimeTypes: ['application/octet-stream'],
      fieldName: 'weights',
    }
  ],
  fileName: (file) => file.originalname,
});

machineLearningModelRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  fileUploadMiddleware,
  routeAdapter(makeCreateMachineLearningModelController())
);
machineLearningModelRouter.get('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeGetMachineLearningModelsController())
);
machineLearningModelRouter.put('/:machineLearningModelId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  fileUploadMiddleware,
  routeAdapter(makeUpdateMachineLearningModelController())
);
machineLearningModelRouter.delete('/:machineLearningModelId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteMachineLearningModelController())
);

