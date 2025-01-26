import { makeCheckoutProvider } from '@/application/shared/providers/checkout-provider/make-checkout-provider';
import { CreatePaymentDetailsOnboardingUrlUseCase } from '../create-payment-details-onboarding-url-use-case';

export function makeCreatePaymentDetailsOnboardingUrlUseCase() {
  const checkoutProvider = makeCheckoutProvider();

  return new CreatePaymentDetailsOnboardingUrlUseCase(checkoutProvider);
}
