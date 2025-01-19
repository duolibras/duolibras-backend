

import { Roles } from '@/application/modules/auth/entities/account';
import { makeCreateMachineLearningModelController } from '@/application/modules/machine-learning-model/use-cases/create-machine-learning-model/factories/make-create-machine-learning-model-controller';
import { makeDeleteMachineLearningModelController } from '@/application/modules/machine-learning-model/use-cases/delete-machine-learning-model/factories/make-delete-machine-learning-model-controller';
import { makeGetMachineLearningModelsController } from '@/application/modules/machine-learning-model/use-cases/get-machine-learning-models/factories/make-get-machine-learning-models-controller';
import { makeUpdateMachineLearningModelController } from '@/application/modules/machine-learning-model/use-cases/update-machine-learning-model/factories/make-update-machine-learning-model-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const machineLearningModelRouter = Router();

machineLearningModelRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeCreateMachineLearningModelController())
);
machineLearningModelRouter.get('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeGetMachineLearningModelsController())
);
machineLearningModelRouter.put('/:machineLearningModelId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeUpdateMachineLearningModelController())
);
machineLearningModelRouter.delete('/:machineLearningModelId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteMachineLearningModelController())
);

