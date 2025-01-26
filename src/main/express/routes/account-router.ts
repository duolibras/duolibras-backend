import { Roles } from '@/application/modules/account/entities/account';
import { makeCreatePaymentDetailsController } from '@/application/modules/account/use-cases/create-payment-details/factories/make-create-payment-details-controller';
import { makeGetPaymentDetailsLoginUrlController } from '@/application/modules/account/use-cases/get-payment-details-login-url/factories/make-get-payment-details-login-url-controller';
import { makeUpdatePaymentDetailsController } from '@/application/modules/account/use-cases/update-payment-details/factories/make-update-payment-details-controller';
import { makeAuthorizationMiddleware } from '@/application/shared/http/middlewares/factories/make-authorization-middleware';
import { Router } from 'express';
import { middlewareAdapter } from '../adapters/middleware-adapter';
import { routeAdapter } from '../adapters/route-adapter';

export const accountsRouter = Router();

accountsRouter.post('/payments-details',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.TEACHER])),
  routeAdapter(makeCreatePaymentDetailsController()),
);

accountsRouter.put('/payments-details',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.TEACHER])),
  routeAdapter(makeUpdatePaymentDetailsController()),
);

accountsRouter.get('/payments-details/login',
  middlewareAdapter(makeAuthorizationMiddleware([Roles.TEACHER])),
  routeAdapter(makeGetPaymentDetailsLoginUrlController()),
);
