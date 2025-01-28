import { CreatePaymentDetailsOnboardingUrlController } from '../create-payment-details-onboarding-url-controller';
import { makeCreatePaymentDetailsOnboardingUrlUseCase } from './make-create-payment-details-onboarding-url-use-case';

export function makeCreatePaymentDetailsOnboardingUrlController() {
  const useCase = makeCreatePaymentDetailsOnboardingUrlUseCase();

  return new CreatePaymentDetailsOnboardingUrlController(useCase);
}
