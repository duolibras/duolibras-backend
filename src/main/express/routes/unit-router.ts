

import { Roles } from '@/application/modules/auth/entities/account';
import { makeCreateUnitController } from '@/application/modules/unit/use-cases/create-unit/factories/make-create-unit-controller';
import { makeDeleteUnitController } from '@/application/modules/unit/use-cases/delete-unit/factories/make-delete-unit-controller';
import { makeGetUnitsController } from '@/application/modules/unit/use-cases/get-units/factories/make-get-units-controller';
import { makeUpdateUnitController } from '@/application/modules/unit/use-cases/update-unit/factories/make-update-unit-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const unitsRouter = Router();

unitsRouter.post('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeCreateUnitController())
);
unitsRouter.get('/',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN, Roles.STUDENT])),
  routeAdapter(makeGetUnitsController())
);
unitsRouter.put('/:unitId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeUpdateUnitController())
);
unitsRouter.delete('/:unitId',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.ADMIN])),
  routeAdapter(makeDeleteUnitController())
);

