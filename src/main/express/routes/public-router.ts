import { makeCreatePaymentDetailsOnboardingUrlController } from '@/application/modules/account/use-cases/create-payment-details-onboarding-url/factories/make-create-payment-details-onboarding-url-controller';
import { makeGetCoursesPublicController } from '@/application/modules/course/use-cases/get-courses/factories/make-get-courses-public-controller';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { routeAdapter } from '../adapters/route-adapter';

export const publicRouter = Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 20,
  message: 'Too many requests, please try again later.'
});

publicRouter.get('/payments-details/onboarding', limiter,
  routeAdapter(makeCreatePaymentDetailsOnboardingUrlController(), {
    bodyParamUrl: 'onboardingUrl',
    shallRedirect: true
  })
);

publicRouter.get('/courses', routeAdapter(makeGetCoursesPublicController()));
